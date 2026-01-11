// src/components/OurFeatures.jsx
import React from 'react';
import { motion } from 'motion/react'; // অথবা framer-motion
import { 
  FaUserPlus, 
  FaSearch, 
  FaExclamationTriangle, 
  FaHistory, 
  FaCalendarCheck, 
  FaHeart 
} from 'react-icons/fa';

const features = [
  {
    icon: <FaUserPlus className="w-12 h-12 text-red-600" />,
    title: "Easy Registration",
    description: "Join as a donor in minutes. Add your blood group, location & contact details securely.",
  },
  {
    icon: <FaSearch className="w-12 h-12 text-red-600" />,
    title: "Smart Donor Search",
    description: "Find nearby eligible donors instantly by blood group, location & availability.",
  },
  {
    icon: <FaExclamationTriangle className="w-12 h-12 text-red-600" />,
    title: "Emergency Requests",
    description: "Post urgent blood needs – notify matching donors immediately with push notifications.",
  },
  {
    icon: <FaHistory className="w-12 h-12 text-red-600" />,
    title: "Donation History & Impact",
    description: "Track your donations, see how many lives you've helped save, and get certificates.",
  },
  {
    icon: <FaCalendarCheck className="w-12 h-12 text-red-600" />,
    title: "Appointment Scheduling",
    description: "Book donation slots at blood banks or camps with automatic reminders.",
  },
  {
    icon: <FaHeart className="w-12 h-12 text-red-600" />,
    title: "Community & Awareness",
    description: "Learn about blood donation, eligibility, myths, and join campaigns to spread awareness.",
  },
];

const OurFeatures = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900  mb-4"
          >
            Why Choose Our Platform?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700  max-w-3xl mx-auto"
          >
            Making blood donation simple, fast, and life-saving for everyone
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="p-8 text-center">
                <div className="mb-6 inline-block p-4 bg-red-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFeatures;