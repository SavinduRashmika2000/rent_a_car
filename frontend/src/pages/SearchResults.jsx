import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, MapPin, Calendar, Clock, Heart, User, Briefcase, Cog } from 'lucide-react';
import PageTransition from '../components/Common/PageTransition';

const cars = [
  {
    id: 1,
    name: 'BMW X5 2024',
    rating: 4.8,
    reviews: 120,
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    bags: 2,
    price: 120,
    originalPrice: 150,
    badge: '🔥 Popular',
    badgeColor: 'text-blue-600 bg-blue-50',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    name: 'Mercedes C-Class 2024',
    rating: 4.6,
    reviews: 98,
    type: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    bags: 2,
    price: 95,
    originalPrice: 120,
    badge: '🏷️ Great Deal',
    badgeColor: 'text-green-600 bg-green-50',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Toyota RAV4 2024',
    rating: 4.5,
    reviews: 76,
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    bags: 2,
    price: 80,
    originalPrice: 100,
    image: 'https://images.unsplash.com/photo-1621007947382-34dd86bbaee3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    name: 'Kia Carnival 2024',
    rating: 4.7,
    reviews: 64,
    type: 'Van',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 8,
    bags: 4,
    price: 110,
    originalPrice: 140,
    image: 'https://images.unsplash.com/photo-1605897472359-85e4b94d685d?auto=format&fit=crop&q=80&w=600'
  }
];

const allFilters = ['All Cars (20)', 'SUV (6)', 'Sedan (6)', 'Luxury (4)', 'Van (4)'];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: 'easeOut' }
  }),
};

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isViewAll = searchParams.get('view') === 'all';
  const [activeFilter, setActiveFilter] = React.useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToCar = (id) => navigate(`/car/${id}`);

  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen pb-32 lg:pb-12">
        <div className="px-5 md:px-8 pt-6 lg:pt-10 max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex justify-between items-center mb-6"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <ArrowLeft size={22} className="text-gray-900" />
            </motion.button>

            <div className="text-center">
              {isViewAll ? (
                <>
                  <h1 className="text-lg font-bold text-gray-900">All Vehicles</h1>
                  <p className="text-xs text-gray-500 font-medium">Find your perfect ride</p>
                </>
              ) : (
                <>
                  <h1 className="text-lg font-bold text-gray-900">Search Results</h1>
                  <p className="text-xs text-gray-500 font-medium">20 Cars found</p>
                </>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-900 font-semibold text-sm"
            >
              <Filter size={18} />
              <span className="hidden sm:block">Filter</span>
            </motion.button>
          </motion.div>

          {/* Search Summary Bar — only for from Search */}
          <AnimatePresence>
            {!isViewAll && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                  <div className="flex items-center gap-3 px-5 py-4 flex-1">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">New York, USA</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Pick-up Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-4 flex-1">
                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Calendar size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">May 20 – May 23</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">3 Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-4 flex-1">
                    <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">10:00 AM</p>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Pick-up Time</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 mb-6 -mx-5 px-5 md:mx-0 md:px-0">
            {allFilters.map((filter, index) => (
              <motion.button
                key={filter}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(index)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl font-semibold text-sm transition-colors shadow-sm ${
                  activeFilter === index
                    ? 'bg-blue-600 text-white shadow-blue-200 shadow-md'
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Car Cards */}
          <div className="flex flex-col gap-4">
            {cars.map((car, i) => (
              <motion.div
                key={car.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px -8px rgba(0,0,0,0.12)' }}
                className="bg-white rounded-3xl border border-gray-100 flex flex-col sm:flex-row overflow-hidden cursor-pointer"
                onClick={() => goToCar(car.id)}
              >
                {/* Left: Image + Rating */}
                <div className="relative w-full sm:w-[220px] md:w-[260px] shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-5 border-b sm:border-b-0 sm:border-r border-gray-100">
                  {car.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold ${car.badgeColor}`}>
                      {car.badge}
                    </span>
                  )}
                  <motion.img
                    src={car.image}
                    alt={car.name}
                    className="w-[180px] h-[110px] object-contain drop-shadow-md"
                    whileHover={{ scale: 1.06, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-yellow-400 text-base">★</span>
                    <span className="text-xs font-bold text-gray-900">{car.rating}</span>
                    <span className="text-xs text-gray-400">({car.reviews})</span>
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{car.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{car.type} • {car.transmission} • {car.fuel}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-300 hover:text-red-500 transition-colors ml-3 shrink-0"
                    >
                      <Heart size={20} />
                    </motion.button>
                  </div>

                  {/* Spec Icons */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" />
                      <span className="text-xs font-medium">{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-gray-400" />
                      <span className="text-xs font-medium">{car.bags} Bags</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Cog size={14} className="text-gray-400" />
                      <span className="text-xs font-medium">{car.transmission}</span>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-gray-400 line-through text-xs">${car.originalPrice}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-blue-600">${car.price}</span>
                        <span className="text-xs text-gray-500 font-medium">/day</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); goToCar(car.id); }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded-xl transition-colors text-sm shadow-md shadow-blue-100"
                    >
                      Select
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="h-6 mt-8" />
        </div>
      </div>
    </PageTransition>
  );
};

export default SearchResults;
