import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[240px] md:h-[320px] lg:h-[400px] rounded-3xl lg:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-lg group">
      {/* Background Image - Using a placeholder high-quality car image */}
      <img 
        src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000" 
        alt="Special Offer BMW" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-10 lg:p-14 flex flex-col justify-between h-full">
        <div>
          <span className="text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-2 md:mb-4 block">Special Offer</span>
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 md:mb-4 max-w-[200px] md:max-w-[320px] lg:max-w-[400px]">
            Get 20% OFF <br /> on Your First Ride
          </h1>
          <p className="text-gray-200 text-xs md:text-base max-w-[180px] md:max-w-[280px] leading-relaxed">
            Book now and enjoy the best deals on premium cars.
          </p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-2xl w-fit flex items-center gap-2 transition-all active:scale-95 text-sm md:text-base">
          Book Now
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[14px] md:h-[14px]">
            <path d="M4.5 9L7.5 6L4.5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div className="w-4 h-1.5 bg-blue-600 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400/50 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-400/50 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
