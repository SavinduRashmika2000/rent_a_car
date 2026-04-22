import React from 'react';
import { Home, Calendar, Heart, MessageSquare, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, active: true },
  { id: 'bookings', label: 'Bookings', icon: Calendar, active: false },
  { id: 'favorites', label: 'Favorites', icon: Heart, active: false },
  { id: 'messages', label: 'Messages', icon: MessageSquare, active: false },
  { id: 'profile', label: 'Profile', icon: User, active: false },
];

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button 
          key={item.id} 
          className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${item.active ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <div className={`${item.active ? 'bg-blue-50 p-2.5 rounded-2xl' : 'p-2.5'}`}>
            <item.icon size={22} className={item.active ? 'fill-blue-600/10' : ''} />
          </div>
          <span className={`text-[10px] font-bold ${item.active ? 'visible' : 'hidden md:visible'}`}>
            {item.label}
          </span>
          {item.active && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
