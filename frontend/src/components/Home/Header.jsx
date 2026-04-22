import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Bell, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex justify-between items-center mb-8 md:mb-12"
    >
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 lg:hidden"
        >
          <Menu size={24} className="text-gray-700" />
        </motion.button>

        {/* Left Signup Option (as requested) */}
        {!user && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="hidden lg:flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
          >
            Signup
          </motion.button>
        )}
      </div>

      {/* Desktop Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        onClick={() => navigate('/')}
        className="hidden lg:flex items-center gap-3 cursor-pointer"
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
        {user ? (
          <>
            {user.roles.includes('ROLE_ADMIN') && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/admin')}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-xl text-xs font-bold text-white hover:bg-black transition-colors mr-2"
              >
                <Shield size={14} />
                Admin Panel
              </motion.button>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-gray-400 text-sm">Welcome back,</p>
              <h2 className="text-lg font-bold text-gray-900">{user.name} 👋</h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={logout}
              className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={24} />
            </motion.button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="hidden sm:block px-5 py-2.5 bg-blue-600 rounded-2xl shadow-md shadow-blue-200 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
