import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, MapPin, Calendar, Clock, Heart, User, Briefcase, Cog, ShieldCheck } from 'lucide-react';

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

const filters = ['All Cars (20)', 'SUV (6)', 'Sedan (6)', 'Luxury (4)', 'Van (4)'];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewAll = searchParams.get('view') === 'all';

  return (
    <div className="px-5 md:px-8 pt-6 lg:pt-10 pb-32 md:pb-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Search Results</h1>
          <p className="text-xs text-gray-500 font-medium">20 Cars found</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-all text-gray-900 font-semibold text-sm">
          <Filter size={18} />
          <span className="hidden sm:block">Filter</span>
        </button>
      </div>

      {/* Conditional Search Details Bar */}
      {!viewAll && (
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <MapPin size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">New York, USA</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Pick-up Location</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-100 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              <Calendar size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">May 20 - May 23</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">3 Days</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-100 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Clock size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">10:00 AM</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Pick-up Time</p>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-6 -mx-5 px-5 md:mx-0 md:px-0">
        {filters.map((filter, index) => (
          <button 
            key={filter}
            className={`whitespace-nowrap px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all shadow-sm ${
              index === 0 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cars List */}
      <div className="flex flex-col gap-4 mb-8 max-w-4xl mx-auto">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/car/${car.id}`)}>
            {/* Left Section: Image and Rating */}
            <div className="w-full md:w-[240px] flex flex-col items-center relative shrink-0 border-b md:border-b-0 md:border-r border-gray-50 pb-4 md:pb-0 md:pr-4">
              {car.badge && (
                <div className={`absolute top-0 left-0 px-2.5 py-1 rounded-lg text-[10px] font-bold z-10 flex items-center gap-1 ${car.badgeColor}`}>
                  {car.badge}
                </div>
              )}
              <img src={car.image} alt={car.name} className="w-[180px] h-[120px] object-contain mb-3" />
              <div className="flex items-center gap-1.5 self-start md:self-center">
                 <span className="text-yellow-500 text-sm">★</span>
                 <span className="text-xs font-bold text-gray-900">{car.rating}</span>
                 <span className="text-xs text-gray-400">({car.reviews})</span>
              </div>
            </div>

            {/* Right Section: Details */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Header: Title and Heart */}
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 text-lg">{car.name}</h3>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* Subheading Specs */}
              <p className="text-xs text-gray-500 mb-3">{car.type} • {car.transmission} • {car.fuel}</p>

              {/* Icon Specs */}
              <div className="flex items-center gap-4 mb-4 md:mb-0 text-gray-500">
                 <div className="flex items-center gap-1">
                   <User size={14} />
                   <span className="text-xs">{car.seats} Seats</span>
                 </div>
                 <div className="flex items-center gap-1">
                   <Briefcase size={14} />
                   <span className="text-xs">{car.bags} Bags</span>
                 </div>
                 <div className="flex items-center gap-1">
                   <Cog size={14} />
                   <span className="text-xs">{car.transmission}</span>
                 </div>
              </div>

              {/* Footer: Price and Button */}
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50 md:border-t-0 md:pt-0">
                
                <div className="flex flex-col md:flex-row w-full justify-between items-end gap-3 md:gap-0">
                  <div className="flex flex-col items-start w-full md:w-auto text-left md:mr-4">
                    <div className="flex items-baseline gap-1">
                       <span className="text-xl font-bold text-blue-600">${car.price}</span>
                       <span className="text-xs text-gray-500 font-medium">/day</span>
                    </div>
                    <p className="text-gray-400 line-through text-xs font-medium">${car.originalPrice}</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/car/${car.id}`)}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-2.5 px-8 rounded-xl transition-all active:scale-95 text-sm shrink-0"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Banner */}
      <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
            <ShieldCheck size={28} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Get More Benefits</h4>
            <p className="text-sm text-gray-500 leading-tight md:max-w-md">Join DriveGo Premium and get exclusive discounts & offers.</p>
          </div>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 shadow-sm">
          <span className="text-lg">👑</span> Explore Premium
        </button>
      </div>

    </div>
  );
};

export default SearchResults;
