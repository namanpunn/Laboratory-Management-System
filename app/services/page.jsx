'use client';

import { motion } from "framer-motion";
import { 
  FaClipboardList, FaProjectDiagram, FaCheckCircle, 
  FaDollarSign, FaFlask, FaBoxes 
} from "react-icons/fa";

const features = [
  { icon: <FaClipboardList />, title: "Sample Management", description: "Track and manage samples efficiently." },
  { icon: <FaProjectDiagram />, title: "Workflow Management", description: "Optimize lab operations seamlessly." },
  { icon: <FaCheckCircle />, title: "Quality Assurance", description: "Ensure high accuracy and standards." },
  { icon: <FaDollarSign />, title: "Quotation & Invoicing", description: "Manage billing and pricing easily." },
  { icon: <FaFlask />, title: "Lab Execution System", description: "Streamline lab procedures." },
  { icon: <FaBoxes />, title: "Inventory Management", description: "Keep track of lab supplies." },
];

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-6 py-12">
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
      >
        Explore how a LIMS helps you
      </motion.h1>

      <p className="text-gray-600 text-lg mt-4 text-center max-w-3xl">
        A modern solution to streamline laboratory workflows, enhance accuracy, and ensure compliance.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <span className="text-blue-600 text-4xl">{item.icon}</span>
            <h3 className="font-semibold text-gray-800 text-lg mt-4">{item.title}</h3>
            <p className="text-gray-500 text-sm text-center mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
