import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const SearchSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Find Your Perfect Car</h3>
          <p className="text-gray-400 text-xs mt-0.5">Search, compare and book a car that suits you</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-700"
        >
          <SlidersHorizontal size={20} />
        </motion.button>
      </div>

      <div className="bg-white p-5 lg:p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center">
        {/* Location + Dates container */}
        <div className="w-full flex flex-col md:flex-row gap-4 lg:flex-1">

          {/* Location */}
          <div className="flex items-center gap-3 w-full md:w-1/2 lg:flex-1">
            <div className="flex-1 bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-transparent focus-within:border-blue-200 transition-all min-w-0">
              <MapPin size={20} className="text-gray-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pick-up Location</p>
                <p className="text-sm font-semibold text-gray-900 truncate">New York, USA</p>
              </div>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <motion.button
              whileTap={{ scale: 0.88 }}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-700 shrink-0"
            >
              <ArrowUpDown size={20} />
            </motion.button>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-1/2 lg:flex-1">
            {/* Pick-up */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-transparent">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={13} className="text-gray-400" />
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pick-up</p>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">May 20, 2024</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
                </div>
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                  <path d="M1 1L4 4L7 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Drop-off */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-transparent">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={13} className="text-gray-400" />
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Drop-off</p>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1.5">May 23, 2024</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
                </div>
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                  <path d="M1 1L4 4L7 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/search')}
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 lg:px-10 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-200 shrink-0"
        >
          <Search size={20} />
          <span className="lg:hidden">Search Cars</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchSection;
