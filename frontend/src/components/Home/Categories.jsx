import React from 'react';
import { useNavigate } from 'react-router-dom';


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
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Popular Categories</h3>
        <button 
          onClick={() => navigate('/search?view=all')}
          className="text-blue-600 text-sm md:text-base font-semibold flex items-center gap-1 hover:underline"
        >
          View all
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-2 md:h-3">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {categories.map((cat) => (
          <div key={cat.id} className="min-w-[100px] flex-1 lg:min-w-0 bg-white p-4 md:p-6 rounded-3xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center gap-2 md:gap-4 hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-12 h-12 md:w-16 md:h-16 ${cat.color} rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl transition-transform group-hover:scale-110`}>
              {cat.icon}
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-sm md:text-base">{cat.name}</p>
              <p className="text-[10px] md:text-xs text-gray-400 font-medium">{cat.count} Cars</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
