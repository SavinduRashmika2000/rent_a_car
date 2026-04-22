import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const topDeals = [
  {
    id: 1,
    name: 'BMW X5 2024',
    rating: 4.8,
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    location: 'New York',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600'
  }
];

const TopDeals = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Top Deals</h3>
        <button 
          onClick={() => navigate('/search?view=all')}
          className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline"
        >
          View all
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topDeals.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-all cursor-pointer group">
            {/* Car Image and Rating Overlay */}
            <div className="relative w-full h-[200px] md:h-[220px] rounded-[2rem] overflow-hidden">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{car.rating}</span>
              </div>
            </div>

            {/* Car Details */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-gray-900">{car.name}</h4>
                <div className="text-right">
                  <p className="text-blue-600 font-bold text-lg">${car.price}<span className="text-[10px] text-gray-400 font-medium">/day</span></p>
                  <p className="text-gray-400 line-through text-[10px] mb-[-4px]">${car.originalPrice}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <p className="text-xs text-gray-500 font-medium">{car.transmission}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <p className="text-xs text-gray-500 font-medium">{car.fuel}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <p className="text-xs text-gray-500 font-medium">{car.seats} Seats</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin size={16} />
                <p className="text-xs font-medium">{car.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
