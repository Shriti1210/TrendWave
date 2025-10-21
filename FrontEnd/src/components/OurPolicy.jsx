import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaHeadset, FaLock, FaUndo } from "react-icons/fa";
import Title from "./Title";

function OurPolicy() {
  const policies = [
    {
      icon: <FaTruck className="text-[#00ffff] text-5xl" />,
      title: "Fast Delivery",
      description: "Quick and safe delivery for every order, right to your doorstep.",
    },
    {
      icon: <FaHeadset className="text-[#00ffff] text-5xl" />,
      title: "24/7 Support",
      description: "Our team is always here to help, anytime you need.",
    },
    {
      icon: <FaLock className="text-[#00ffff] text-5xl" />,
      title: "Secure Payment",
      description: "We ensure safe and encrypted transactions for your peace of mind.",
    },
    {
      icon: <FaUndo className="text-[#00ffff] text-5xl" />,
      title: "Easy Returns",
      description: "Hassle-free returns and exchanges within a few simple steps.",
    },
  ];

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-l from-[#190221] to-[#091c45] text-white pt-20 overflow-hidden"
    >
      {/* Title */}
      <Title text1="OUR" text2="POLICIES" />

      {/* Decorative gradient line below title */}
      <div className="w-[180px] h-[3px] mt-2 bg-gradient-to-r from-[#00ffff] to-transparent rounded-full" />

      {/* Cards Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-20 mt-12"
      >
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{
              scale: 1.07,
              boxShadow: "0 0 25px rgba(0, 255, 255, 0.6)",
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              type: "spring",
              stiffness: 120,
            }}
            className="bg-gradient-to-b from-[#1c0440] to-[#0b1a3a]
            p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer
            transition-all duration-200 ease-out"
          >
            {policy.icon}
            <h3 className="text-2xl font-semibold mt-4 mb-2">{policy.title}</h3>
            <p className="text-gray-300 text-sm">{policy.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative gradient line below cards */}
      <div className="w-[60%] md:w-[40%] h-[2px] mt-16 mb-10 bg-gradient-to-r from-transparent via-[#00ffff] to-transparent rounded-full opacity-70" />
    </div>
  );
}

export default OurPolicy;
