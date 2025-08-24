import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Phone, User, Mail, MapPin, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { state, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) return 'Name is required';
    if (!customerInfo.email.trim()) return 'Email is required';
    if (!customerInfo.phone.trim()) return 'Phone number is required';
    if (!customerInfo.address.trim()) return 'Address is required';
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) return 'Please enter a valid email address';
    
    // Validate phone format (Kenyan numbers)
    const phoneRegex = /^(\+254|254|0)?[17]\d{8}$/;
    if (!phoneRegex.test(customerInfo.phone.replace(/\s/g, ''))) {
      return 'Please enter a valid Kenyan phone number';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Create order
      const orderResponse = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
          customerInfo,
          totalAmount: state.total,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await orderResponse.json();

      // Initiate M-Pesa payment
      const paymentResponse = await fetch('http://localhost:3001/api/mpesa/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          phoneNumber: customerInfo.phone,
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to initiate payment');
      }

      // Show success message
      setPaymentStatus('success');
      
      // Poll for payment status
      const pollPaymentStatus = async () => {
        try {
          const statusResponse = await fetch(`http://localhost:3001/api/orders/${orderId}/status`);
          const statusData = await statusResponse.json();
          
          if (statusData.status === 'paid') {
            clearCart();
            setTimeout(() => {
              onSuccess();
              setPaymentStatus('idle');
              setCustomerInfo({ name: '', email: '', phone: '', address: '' });
            }, 3000);
          } else if (statusData.status === 'payment_failed') {
            setPaymentStatus('error');
            setErrorMessage('Payment failed. Please try again.');
          } else {
            // Continue polling
            setTimeout(pollPaymentStatus, 3000);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      };

      // Start polling after a short delay
      setTimeout(pollPaymentStatus, 5000);

    } catch (error) {
      console.error('Checkout error:', error);
      setPaymentStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {paymentStatus === 'success' ? (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CreditCard className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Initiated!</h3>
                  <p className="text-gray-600 mb-4">
                    Please check your phone for the M-Pesa payment prompt and complete the transaction.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Waiting for payment confirmation...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  {/* Order Summary */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span className="text-gray-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-amber-600">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-amber-600">{formatPrice(state.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-1" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-1" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" />
                        Phone Number (M-Pesa)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                        placeholder="0712345678 or +254712345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Delivery Address
                      </label>
                      <textarea
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Enter your delivery address"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">M-PESA</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">M-Pesa Payment</p>
                        <p className="text-sm text-gray-600">
                          You'll receive a payment prompt on your phone
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Pay {formatPrice(state.total)} via M-Pesa
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;