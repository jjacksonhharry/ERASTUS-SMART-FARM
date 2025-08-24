import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const products = [
    {
      id: 1,
      name: 'Day Old Chicks',
      price: 80,
      image: './Day Old Chicks.jpg',
      description: 'Healthy, vaccinated one day old chicks ready for raising',
      rating: 5,
      features: ['Vaccinated', 'Health guaranteed', 'Various breeds available'],
      category: 'Live Birds'
    },
    {
      id: 2,
      name: 'Month Old Chicks',
      price: 350,
      image: './Month Old Chicks.jpg',
      description: 'Well-developed 1 month old chicks, ready for outdoor raising',
      rating: 5,
      features: ['Fully feathered', 'Strong and healthy', 'Ready for free-range'],
      category: 'Live Birds'
    },
    {
      id: 3,
      name: 'Fresh Broilers',
      price: 1299,
      image: './Fresh Broilers.jpg',
      description: 'Premium free-range broilers, processed fresh daily',
      rating: 5,
      features: ['Free-range', 'No antibiotics', 'Fresh processed'],
      category: 'Fresh Meat'
    },
    {
      id: 4,
      name: 'Fresh Kienyejis',
      price: 1599,
      image: './Fresh Kienyejis.jpg',
      description: 'Traditional indigenous chickens, naturally raised and flavorful',
      rating: 5,
      features: ['Indigenous breed', 'Natural diet', 'Rich flavor'],
      category: 'Fresh Meat'
    },
    {
      id: 5,
      name: 'Farm Fresh Eggs',
      price: 450,
      image: './Farm Fresh Eggs.jpg',
      description: 'Grade A large eggs from free-range hens (per tray of 30)',
      rating: 5,
      features: ['Grade A large', 'Free-range hens', 'Rich golden yolks'],
      category: 'Eggs'
    },
    {
      id: 6,
      name: 'Fertilised Eggs for Hatching',
      price: 50,
      image: './Fertilised Eggs for Hatching.jpg',
      description: 'High-quality fertilised eggs perfect for hatching (per piece)',
      rating: 5,
      features: ['High fertility rate', 'Quality breeding stock', 'Various breeds available'],
      category: 'Eggs'
    }
  ];

  const categories = ['All Products', 'Live Birds', 'Fresh Meat', 'Eggs'];

  const filteredProducts = selectedCategory === 'All Products' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              From day-old chicks to farm-fresh eggs, discover our complete range of premium poultry products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-amber-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-200"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-600">{formatPrice(product.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Custom Orders Welcome</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Need something specific? I'm happy to accommodate custom orders and special requests. 
              Contact me to discuss your requirements.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              Request Custom Order
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Products;