import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart } from 'lucide-react';

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
  },
  {
    id: 2,
    name: 'Mercedes C-Class 2024',
    rating: 4.6,
    type: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    location: 'Los Angeles',
    price: 95,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Toyota RAV4 2024',
    rating: 4.5,
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    location: 'Chicago',
    price: 80,
    originalPrice: 100,
    image: 'https://images.unsplash.com/photo-1621007947382-34dd86bbaee3?auto=format&fit=crop&q=80&w=600'
  },
];

const TopDeals = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-4"
      >
        <h3 className="text-lg font-bold text-gray-900">Top Deals</h3>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => navigate('/search?view=all')}
          className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:underline"
        >
          View all
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topDeals.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)' }}
            onClick={() => navigate(`/car/${car.id}`)}
            className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-4 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative w-full h-[180px] md:h-[200px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <motion.img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.5 }}
              />
              {/* Rating badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-gray-900">{car.rating}</span>
              </div>
              {/* Heart */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm text-gray-300 hover:text-red-500 transition-colors"
              >
                <Heart size={15} />
              </motion.button>
            </div>

            {/* Details */}
            <div>
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-base font-bold text-gray-900">{car.name}</h4>
                <div className="text-right">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-blue-600 font-bold text-lg">${car.price}</span>
                    <span className="text-[10px] text-gray-400">/day</span>
                  </div>
                  <p className="text-gray-400 line-through text-[10px]">${car.originalPrice}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                {[car.transmission, car.fuel, `${car.seats} Seats`].map((spec) => (
                  <div key={spec} className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <p className="text-xs text-gray-500">{spec}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-gray-400">
                <MapPin size={14} />
                <p className="text-xs font-medium">{car.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
