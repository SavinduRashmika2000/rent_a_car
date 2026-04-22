import React from 'react';
import { Menu, Bell } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8 md:mb-12">
      {/* Mobile Menu */}
      <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all lg:hidden">
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Desktop Logo */}
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-blue-200">
          R
        </div>
        <span className="text-2xl font-bold text-gray-900 tracking-tight">RentAuto</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-500">
        <a href="#" className="text-blue-600 font-bold">Home</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Bookings</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Fleet</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
      </nav>
      
      {/* User Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h2 className="text-lg font-bold text-gray-900">John Smith 👋</h2>
        </div>
        <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative active:scale-95 transition-all hidden sm:block">
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
        </button>
        {/* Mobile Welcome Center */}
        <div className="text-center sm:hidden">
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h2 className="text-xl font-bold text-gray-900">John Smith 👋</h2>
        </div>
        {/* Mobile Bell */}
        <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 relative active:scale-95 transition-all sm:hidden">
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
