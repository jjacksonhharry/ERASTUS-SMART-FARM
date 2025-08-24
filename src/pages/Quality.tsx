import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Leaf, CheckCircle, BadgeCheck, Stethoscope } from 'lucide-react';

const Quality = () => {
  const qualityPoints = [
    'Free-range environment for natural growth',
    'No antibiotics or growth hormones',
    'Organic, non-GMO feed only',
    'Regular veterinary health checks',
    'Humane treatment and care',
    'Fresh processing and packaging'
  ];

  const certifications = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'KEBS Certified',
      description: 'Approved by the Kenya Bureau of Standards for safety and quality assurance.'
    },
    {
      icon: <Stethoscope className="h-12 w-12" />,
      title: 'County Veterinary Services',
      description: 'Regular inspections by local veterinary and livestock officers.'
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: 'Animal Welfare',
      description: 'We follow humane treatment and care standards in poultry farming.'
    },
    {
      icon: <Leaf className="h-12 w-12" />,
      title: 'Natural Feed Practices',
      description: 'Committed to organic, chemical-free feed for healthy growth.'
    }
  ];

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
            <h1 className="text-5xl font-bold mb-6">Uncompromising Quality</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              At Erastus Farm, quality isn't just a promise – it's our commitment to you and our chickens. 
              Every bird is raised with care, respect, and the highest standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Quality Standards</h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe that happy, healthy chickens produce the best meat and eggs. 
                That's why we maintain the highest standards in every aspect of our operation.
              </p>
              <div className="space-y-4">
                {qualityPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Video */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <video
                src="./free-range.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Certified Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is recognized by trusted local and regional bodies
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-xl bg-white border border-yellow-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {cert.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{cert.title}</h3>
                <p className="text-gray-600 leading-relaxed">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">From Farm to Table</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every step of our process is designed to ensure the highest quality and freshness
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Raising', 'Processing', 'Packaging', 'Delivery'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step}</h3>
                <div className="w-full h-1 bg-yellow-200 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Quality;
