import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full h-[240px] md:h-[320px] lg:h-[420px] rounded-3xl lg:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-xl group"
    >
      {/* Background Image with parallax-like zoom on hover */}
      <motion.img
        src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1400"
        alt="Special Offer BMW"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        whileHover={{ scale: 1.04 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 lg:p-14 flex flex-col justify-between h-full">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-3 block">Special Offer</span>
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4 max-w-[200px] md:max-w-[320px] lg:max-w-[440px]">
            Get 20% OFF <br /> on Your First Ride
          </h1>
          <p className="text-gray-300 text-xs md:text-base max-w-[180px] md:max-w-[280px] leading-relaxed">
            Book now and enjoy the best deals on premium cars.
          </p>
        </motion.div>

        <motion.button
          onClick={() => navigate('/search?view=all')}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl w-fit flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/30 text-sm md:text-base"
        >
          Book Now
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 9L7.5 6L4.5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div className="w-5 h-1.5 bg-blue-500 rounded-full" />
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
      </div>
    </motion.div>
  );
};

export default Hero;
