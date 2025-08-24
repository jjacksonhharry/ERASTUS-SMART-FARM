import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Home from './pages/Home';
import Quality from './pages/Quality';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Popup from './components/Popup';

function App() {
  const [showPopup, setShowPopup] = useState(true); // popup visible on load

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
        {/* Popup */}
        <AnimatePresence>
          {showPopup && (
            <Popup onClose={() => setShowPopup(false)} />
          )}
        </AnimatePresence>

        <Navbar />
        <div className="scroll-smooth pt-16">
          <section id="home">
            <Home />
          </section>
          <section id="quality">
            <Quality />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="products">
            <Products />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </div>
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
