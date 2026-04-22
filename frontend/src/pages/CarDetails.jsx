import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, Share2, ImageIcon,
  Check, MapPin, Droplet, Settings, Gauge,
  CarFront, Briefcase, Wind, Bluetooth, Info
} from 'lucide-react';
import PageTransition from '../components/Common/PageTransition';

const checks = ['Unlimited KM', 'Free Cancellation', 'No Hidden Charges'];

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    fetch(`http://localhost:8080/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching car details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading car details...</div>;
  }

  if (!car) {
    return <div className="min-h-screen flex items-center justify-center">Car not found</div>;
  }

  const specs = [
    { icon: Droplet, label: 'Fuel Type', value: car.fuel },
    { icon: Gauge, label: 'Engine', value: '3.0L' }, // Static for now as not in DB
    { icon: Gauge, label: 'Mileage', value: '12 km/l' }, // Static for now
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: CarFront, label: 'Doors', value: '5' }, // Static for now
    { icon: Briefcase, label: 'Luggage', value: '2 Bags' }, // Static for now
    { icon: Wind, label: 'Air Conditioning', value: 'Yes' },
    { icon: Bluetooth, label: 'Bluetooth', value: 'Yes' },
  ];

  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen relative pb-36 lg:pb-12">

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[320px] md:h-[450px] lg:h-[520px] bg-white overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />

          {/* Header Actions */}
          <div className="absolute top-6 left-0 right-0 px-5 md:px-8 flex justify-between items-center z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-900"
            >
              <ArrowLeft size={22} />
            </motion.button>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart size={22} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-700"
              >
                <Share2 size={22} />
              </motion.button>
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-sm text-gray-900">
            <ImageIcon size={16} className="text-gray-500" />
            1 / 12
          </div>
        </motion.div>

        {/* Content */}
        <div className="pt-5 px-5 md:px-8 max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">

          {/* Left Column */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            {/* Title */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{car.name}</h1>
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-xl shrink-0 ml-3">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-sm font-bold text-gray-900">{car.rating}</span>
                <span className="text-xs text-gray-400 font-medium">(120)</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-5">{car.type} • {car.transmission} • {car.fuel}</p>

            {/* Spec Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: CarFront, text: '5 Seats' },
                { icon: Briefcase, text: '2 Bags' },
                { icon: Settings, text: 'Automatic' },
                { icon: Wind, text: 'Air Conditioning' },
              ].map((tag) => (
                <motion.div
                  key={tag.text}
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl bg-white text-xs font-semibold text-gray-600 shadow-sm"
                >
                  <tag.icon size={15} className="text-gray-400" />
                  {tag.text}
                </motion.div>
              ))}
            </div>

            {/* Pricing Box */}
            <motion.div
              whileHover={{ boxShadow: '0 8px 30px -8px rgba(29,78,216,0.15)' }}
              className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 transition-shadow"
            >
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Price per day</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-blue-600">${car.price}</span>
                  <span className="text-sm text-gray-500 font-medium">/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 line-through text-sm">${car.originalPrice}</p>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">20% OFF</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {checks.map((c) => (
                  <motion.div key={c} className="flex items-center gap-2" whileHover={{ x: 2 }}>
                    <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-green-500" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{c}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pick-up & Drop-off */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Pick-up & Drop-off</h3>
                <button className="text-blue-600 font-bold text-xs hover:underline">Edit</button>
              </div>
              <div className="relative pl-6">
                <div className="absolute top-3 bottom-3 left-[5px] border-l-2 border-dashed border-gray-200"></div>
                {/* Pick-up */}
                <div className="mb-6 relative">
                  <div className="absolute -left-[27px] top-2 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white"></div>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-gray-50 rounded-full"><MapPin size={17} className="text-gray-700" /></div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pick-up</p>
                        <p className="text-sm font-bold text-gray-900">{car.location} Airport</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-xs font-bold text-gray-900">May 20, 2024</p>
                      <p className="text-[10px] text-gray-400">10:00 AM</p>
                    </div>
                  </div>
                </div>
                {/* Drop-off */}
                <div className="relative">
                  <div className="absolute -left-[27px] top-2 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-white"></div>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-start">
                      <div className="p-2 bg-gray-50 rounded-full"><MapPin size={17} className="text-gray-700" /></div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Drop-off</p>
                        <p className="text-sm font-bold text-gray-900">{car.location} Airport</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-xs font-bold text-gray-900">May 23, 2024</p>
                      <p className="text-[10px] text-gray-400">10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                {specs.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                  >
                    <s.icon size={20} className="text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium leading-tight">{s.label}</p>
                      <p className="text-xs font-bold text-gray-900">{s.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop Sidebar */}
          <div className="lg:w-[320px] shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-white border border-gray-100 shadow-xl rounded-[2rem] p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Booking Summary</h3>
              <div className="border-b border-gray-100 pb-5 mb-5">
                <p className="text-sm font-medium text-gray-400 mb-1">Total Price</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-blue-600">${car.price * 3}</span>
                  <Info size={16} className="text-gray-300 relative top-0.5" />
                </div>
                <p className="text-xs text-gray-400 mt-1">for 3 days</p>
              </div>
              <ul className="text-sm text-gray-600 mb-6 space-y-3">
                <li className="flex justify-between"><span>Car Rental (3d)</span><span className="font-bold text-gray-900">${car.price * 3}</span></li>
                <li className="flex justify-between"><span>Taxes & Fees</span><span className="text-green-600 font-semibold">Included</span></li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
              >
                Continue to Book
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.08)] lg:hidden"
        >
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-blue-600">${car.price * 3}</span>
              <Info size={15} className="text-gray-300 relative top-0.5" />
            </div>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Total · 3 days</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-200 text-sm"
          >
            Continue to Book
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default CarDetails;
