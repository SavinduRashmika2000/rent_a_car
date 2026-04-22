import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 1, name: 'SUV', count: 12, icon: '🚙', color: 'bg-blue-50' },
  { id: 2, name: 'Sedan', count: 18, icon: '🚗', color: 'bg-green-50' },
  { id: 3, name: 'Luxury', count: 10, icon: '💎', color: 'bg-orange-50' },
  { id: 4, name: 'Van', count: 8, icon: '🚐', color: 'bg-purple-50' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-4 md:mb-6"
      >
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Popular Categories</h3>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => navigate('/search?view=all')}
          className="text-blue-600 text-sm md:text-base font-semibold flex items-center gap-1 hover:underline"
        >
          View all
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ y: -4, boxShadow: '0 12px 24px -8px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="min-w-[100px] flex-1 lg:min-w-0 bg-white p-4 md:p-6 rounded-3xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center gap-2 md:gap-4 cursor-pointer"
          >
            <motion.div
              className={`w-12 h-12 md:w-16 md:h-16 ${cat.color} rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl`}
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
            >
              {cat.icon}
            </motion.div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-sm md:text-base">{cat.name}</p>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">{cat.count} Cars</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
