import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const SearchSection = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Find Your Perfect Car</h3>
          <p className="text-gray-400 text-xs">Search, compare and book a car that suits you</p>
        </div>
        <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all text-gray-700">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div className="bg-white p-5 lg:p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center">
        {/* Container for Location and Dates on Desktop */}
        <div className="w-full flex-col md:flex-row flex gap-4 lg:flex-1">
          {/* Location Row */}
          <div className="flex items-center gap-4 w-full md:w-1/2 lg:w-auto lg:flex-1">
            <div className="flex-1 bg-gray-50 p-4 rounded-2xl flex items-center gap-3 border border-gray-50 focus-within:border-blue-200 transition-all min-w-[200px]">
              <MapPin size={20} className="text-gray-400 shrink-0" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pick-up Location</p>
              <p className="text-sm font-semibold text-gray-900">New York, USA</p>
            </div>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all text-gray-700 shrink-0">
              <ArrowUpDown size={20} />
            </button>
          </div>

          {/* Date Row */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-1/2 lg:w-auto lg:flex-1">
            {/* Pick-up Date */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-50 min-w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} className="text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Pick-up Date</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-2">May 20, 2024</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L4 4L7 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Drop-off Date */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} className="text-gray-400" />
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Drop-off Date</p>
            </div>
            <p className="text-sm font-semibold text-gray-900 mb-2">May 23, 2024</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <p className="text-sm font-semibold text-gray-900">10:00 AM</p>
              </div>
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L4 4L7 1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

        {/* Search Button */}
        <button 
          onClick={() => navigate('/search')}
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 lg:px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-md shadow-blue-200 shrink-0 h-full"
        >
          <Search size={20} />
          <span className="lg:hidden">Search Cars</span>
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
