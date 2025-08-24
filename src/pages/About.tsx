import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sprout, Shield, Award } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2021', event: 'Erastus Farm was founded with a passion for poultry farming' },
    { year: '2022', event: 'Expanded flocks and adopted sustainable farming practices' },
    { year: '2023', event: 'Gained recognition for quality poultry and ethical practices' },
    { year: '2024', event: 'Built strong community trust and influence in local farming' },
    { year: '2025', event: 'Recognized as a leading farmer making a positive impact on society' },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion for Poultry',
      description: 'Our deep love for raising healthy, happy chickens drives everything we do'
    },
    {
      icon: <Sprout className="h-8 w-8" />,
      title: 'Sustainable Farming',
      description: 'We nurture the land and our animals through environmentally conscious practices'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Animal Welfare',
      description: 'Every chicken receives the care, space, and respect they deserve to thrive'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Excellence',
      description: 'Our dedication to superior farming methods produces exceptional products'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-6">Our Passion</h1>
              <p className="text-xl text-yellow-100 leading-relaxed">
                At Erastus Farm, my love for agriculture and dedication to raising exceptional 
                poultry drives me to create the finest, most ethically-produced chicken you'll find.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="./logo.jpg"
                alt="Farm Landscape"
                className="w-full h-auto max-h-[600px] object-contain rounded-2xl shadow-2xl bg-gray-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="./about.jpg"
                alt="Passionate Farming"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Born from Love of the Land</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Erastus Farm was born from my deep, unwavering passion for agriculture and an 
                absolute love for raising poultry. What drives me every day is the joy I find 
                in watching my chickens roam freely, knowing they're living their best lives 
                in a natural, caring environment.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                My fascination with poultry farming goes beyond just raising chickens – I'm a 
                student of their behavior, advocate for their wellbeing, and guardian of 
                sustainable practices that benefit both our birds and the earth they call home.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every morning, I wake up excited to tend to my flock, knowing that my 
                passion translates directly into the exceptional quality and taste of every 
                product that reaches your family's table.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Drives Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The core passions that fuel my commitment to exceptional poultry farming
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center p-6 rounded-xl bg-white border border-yellow-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Evolution</h2>
            <p className="text-xl text-gray-600">How my passion has shaped my farming practices</p>
          </motion.div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center gap-6 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-bold text-lg min-w-fit">
                  {milestone.year}
                </div>
                <div className="flex-1 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-amber-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">My Farming Philosophy</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The core principles that guide my approach to raising the happiest, healthiest chickens with unwavering dedication.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {['Daily Care', 'Natural Environment', 'Quality Focus'].map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{principle}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;