
import React from 'react';
import { motion } from 'motion/react'; 
import { FaClipboardCheck, FaHandHoldingHeart, FaUsersCog, FaUserShield } from 'react-icons/fa';


const services = [
  {
    role: "For Donors / Users",
    icon: <FaHandHoldingHeart className="w-14 h-14 text-red-600" />,
    items: [
      "Quick & secure registration as blood donor",
      "Smart search for nearby donors (blood group + location)",
      "Receive instant emergency blood requests notifications",
      "Track donation history & see your real impact (lives saved)",
      "Schedule donation appointments & get reminders",
    ],
  },
  {
    role: "For Volunteers",
    icon: <FaUsersCog className="w-14 h-14 text-red-600" />,
    items: [
      "Organize & promote local blood donation camps/events",
      "Manage volunteer teams & assign tasks",
      "Coordinate with donors during emergencies",
      "Raise awareness through campaigns & social sharing",
      "Get recognition & badges for active contributions",
    ],
  },
  {
    role: "For Admins",
    icon: <FaUserShield className="w-14 h-14 text-red-600" />,
    items: [
      "Full dashboard to manage all users & roles",
      "Approve/reject blood requests & donor profiles",
      "Monitor blood stock, requests & donation statistics",
      "Handle inquiries, reports & system settings",
      "Generate analytics & impact reports",
    ],
  },
];

const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-white ">
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
            Our Key Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-600 max-w-4xl mx-auto"
          >
            Tailored solutions for every role in our blood donation community — Donors, Volunteers, and Admins
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <div className="p-8 md:p-10 text-center">
                <div className="mb-8 inline-block p-5 bg-red-50 rounded-full">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  {service.role}
                </h3>
                
                <ul className="text-left space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-800">
                      <FaClipboardCheck className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;