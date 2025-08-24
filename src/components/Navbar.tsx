import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Quality', path: 'quality' },
    { name: 'About Us', path: 'about' },
    { name: 'Products', path: 'products' },
    { name: 'Contact', path: 'contact' },
  ];

  const isActive = (path: string) => activeSection === path;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false); // close mobile menu after clicking
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'quality', 'about', 'products', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">🐔</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Erastus Farm</span>
              <span className="text-sm text-yellow-600">Premium Chicken</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => scrollToSection(item.path)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-yellow-600 focus:outline-none ${
                  isActive(item.path)
                    ? "text-yellow-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>(+254) 714063757</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { maxHeight: 500, opacity: 1 } : { maxHeight: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => scrollToSection(item.path)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-600 focus:outline-none focus:bg-yellow-50 focus:text-yellow-600 ${
                  isActive(item.path)
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Phone className="w-4 h-4" />
                <span>(+254) 714063757</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@erastusfarm.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
