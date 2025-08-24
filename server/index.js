const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (use database in production)
const orders = new Map();
const mpesaTokens = new Map();

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
  passkey: process.env.MPESA_PASSKEY,
  callbackUrl: process.env.MPESA_CALLBACK_URL,
  baseUrl: 'https://sandbox.safaricom.co.ke', // Use production URL in live environment
};

// Generate M-Pesa access token
async function generateMpesaToken() {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    const response = await axios.get(
      `${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;
    
    // Cache token with expiration
    mpesaTokens.set('current', {
      token,
      expiresAt: Date.now() + (expiresIn * 1000) - 60000, // Refresh 1 minute before expiry
    });

    return token;
  } catch (error) {
    console.error('Error generating M-Pesa token:', error.response?.data || error.message);
    throw new Error('Failed to generate M-Pesa token');
  }
}

// Get valid M-Pesa token
async function getMpesaToken() {
  const cached = mpesaTokens.get('current');
  
  if (cached && cached.expiresAt > Date.now()) {
    return cached.token;
  }
  
  return await generateMpesaToken();
}

// Generate M-Pesa password
function generateMpesaPassword(timestamp) {
  const data = MPESA_CONFIG.businessShortCode + MPESA_CONFIG.passkey + timestamp;
  return Buffer.from(data).toString('base64');
}

// Create order endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerInfo, totalAmount } = req.body;

    // Validate request
    if (!items || !customerInfo || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order
    const orderId = uuidv4();
    const order = {
      id: orderId,
      items,
      customerInfo,
      totalAmount,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.set(orderId, order);

    res.json({ orderId, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Initiate M-Pesa payment
app.post('/api/mpesa/payment', async (req, res) => {
  try {
    const { orderId, phoneNumber } = req.body;

    // Validate request
    if (!orderId || !phoneNumber) {
      return res.status(400).json({ error: 'Order ID and phone number are required' });
    }

    // Get order
    const order = orders.get(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Format phone number (remove leading 0 and add 254)
    const formattedPhone = phoneNumber.startsWith('0') 
      ? '254' + phoneNumber.substring(1)
      : phoneNumber.startsWith('254') 
      ? phoneNumber 
      : '254' + phoneNumber;

    // Get M-Pesa token
    const token = await getMpesaToken();

    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generateMpesaPassword(timestamp);

    // Prepare STK push request
    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(order.totalAmount),
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.businessShortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${MPESA_CONFIG.callbackUrl}/${orderId}`,
      AccountReference: `ORDER-${orderId.substring(0, 8)}`,
      TransactionDesc: `Payment for Erastus Farm Order ${orderId.substring(0, 8)}`,
    };

    // Send STK push
    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Update order with checkout request ID
    order.checkoutRequestId = response.data.CheckoutRequestID;
    order.status = 'payment_initiated';
    orders.set(orderId, order);

    res.json({
      message: 'Payment initiated successfully',
      checkoutRequestId: response.data.CheckoutRequestID,
    });

  } catch (error) {
    console.error('Error initiating M-Pesa payment:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// M-Pesa callback endpoint
app.post('/api/mpesa/callback/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const callbackData = req.body;

    console.log('M-Pesa callback received:', { orderId, callbackData });

    const order = orders.get(orderId);
    if (!order) {
      console.error('Order not found for callback:', orderId);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Process callback
    if (callbackData.Body?.stkCallback) {
      const callback = callbackData.Body.stkCallback;
      
      if (callback.ResultCode === 0) {
        // Payment successful
        order.status = 'paid';
        order.mpesaReceiptNumber = callback.CallbackMetadata?.Item?.find(
          item => item.Name === 'MpesaReceiptNumber'
        )?.Value;
        order.paidAt = new Date().toISOString();
      } else {
        // Payment failed
        order.status = 'payment_failed';
        order.failureReason = callback.ResultDesc;
      }

      orders.set(orderId, order);
    }

    res.json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Error processing M-Pesa callback:', error);
    res.status(500).json({ error: 'Failed to process callback' });
  }
});

// Check payment status
app.get('/api/orders/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.get(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      orderId: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      mpesaReceiptNumber: order.mpesaReceiptNumber,
      paidAt: order.paidAt,
    });
  } catch (error) {
    console.error('Error checking order status:', error);
    res.status(500).json({ error: 'Failed to check order status' });
  }
});

// Get all orders (admin endpoint)
app.get('/api/orders', (req, res) => {
  try {
    const allOrders = Array.from(orders.values()).map(order => ({
      id: order.id,
      customerInfo: order.customerInfo,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      paidAt: order.paidAt,
      itemCount: order.items.length,
    }));

    res.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});