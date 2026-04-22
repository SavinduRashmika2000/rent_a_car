import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Bell } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex justify-between items-center mb-8 md:mb-12"
    >
      {/* Mobile Menu */}
      <motion.button
        whileTap={{ scale: 0.88 }}
        className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 lg:hidden"
      >
        <Menu size={24} className="text-gray-700" />
      </motion.button>

      {/* Desktop Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="hidden lg:flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-blue-200">R</div>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">RentAuto</span>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-500">
        {['Home', 'Bookings', 'Fleet', 'Contact'].map((item, i) => (
          <motion.a
            key={item}
            href="#"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={`transition-colors hover:text-gray-900 ${item === 'Home' ? 'text-blue-600 font-bold' : ''}`}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h2 className="text-lg font-bold text-gray-900">John Smith 👋</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative hidden sm:flex items-center justify-center"
        >
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
        </motion.button>

        {/* Mobile Welcome */}
        <div className="text-center sm:hidden">
          <p className="text-gray-400 text-xs">Welcome back,</p>
          <h2 className="text-base font-bold text-gray-900">John Smith 👋</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative sm:hidden"
        >
          <Bell size={22} className="text-gray-700" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Header;
