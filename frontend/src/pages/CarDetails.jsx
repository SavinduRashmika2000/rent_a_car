import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share2, ImageIcon, 
  Rotate3D, Armchair, LayoutGrid, Check, 
  MapPin, Droplet, Settings, Gauge, 
  CarFront, Briefcase, Wind, Bluetooth, Info
} from 'lucide-react';

const CarDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen relative pb-32">
      {/* Top Image Section */}
      <div className="relative w-full h-[320px] md:h-[450px] lg:h-[500px] bg-white">
        <img 
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000" 
          alt="BMW X5 2024" 
          className="w-full h-full object-cover"
        />
        
        {/* Header Actions */}
        <div className="absolute top-6 left-0 right-0 px-5 md:px-8 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center active:scale-95 transition-all text-gray-900"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex gap-3">
            <button className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center active:scale-95 transition-all text-gray-400 hover:text-red-500">
              <Heart size={22} />
            </button>
            <button className="w-11 h-11 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center active:scale-95 transition-all text-gray-700">
              <Share2 size={22} />
            </button>
          </div>
        </div>

        {/* Image Badge */}
        <div className="absolute bottom-16 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm font-semibold text-sm text-gray-900">
          <ImageIcon size={16} className="text-gray-500" />
          1 / 12
        </div>

        {/* Floating Action Pills */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-3 z-20 overflow-x-auto scrollbar-hide px-5">
          <button className="bg-white px-5 py-3 rounded-full shadow-md flex items-center gap-2 font-bold text-blue-600 text-sm whitespace-nowrap active:scale-95 transition-all outline outline-2 outline-blue-100">
            <Rotate3D size={18} />
            360° View
          </button>
          <button className="bg-white px-5 py-3 rounded-full shadow-md flex items-center gap-2 font-semibold text-gray-600 text-sm whitespace-nowrap active:scale-95 transition-all">
            <Armchair size={18} className="text-blue-500" />
            Interior
          </button>
          <button className="bg-white px-5 py-3 rounded-full shadow-md flex items-center gap-2 font-semibold text-gray-600 text-sm whitespace-nowrap active:scale-95 transition-all">
            <LayoutGrid size={18} className="text-blue-500" />
            Features
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-14 px-5 md:px-8 max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Details) */}
        <div className="flex-1">
          {/* Title & Rating */}
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">BMW X5 2024</h1>
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-xl">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm font-bold text-gray-900">4.8</span>
              <span className="text-xs text-gray-500 font-medium">(120)</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-5">SUV • Automatic • Petrol</p>

          <div className="flex flex-wrap items-center gap-3 mb-8 text-gray-600 font-medium">
             <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white text-xs shadow-sm">
               <CarFront size={16} className="text-gray-400" /> 5 Seats
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white text-xs shadow-sm">
               <Briefcase size={16} className="text-gray-400" /> 2 Bags
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white text-xs shadow-sm">
               <Settings size={16} className="text-gray-400" /> Automatic
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white text-xs shadow-sm">
               <Wind size={16} className="text-gray-400" /> Air Conditioning
             </div>
          </div>

          {/* Pricing Highlight Box */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Price per day</p>
              <div className="flex items-baseline gap-1 mb-1">
                 <span className="text-3xl font-bold text-blue-600">$120</span>
                 <span className="text-sm text-gray-900 font-medium">/day</span>
              </div>
              <div className="flex items-center gap-2">
                 <p className="text-gray-400 line-through text-sm font-medium">$150</p>
                 <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md">20% OFF</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-600">Unlimited KM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-600">Free Cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-600">No Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Pick-up & Drop-off */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 text-sm">Pick-up & Drop-off</h3>
              <button className="text-blue-600 font-bold text-xs hover:underline">Edit</button>
            </div>
            
            <div className="relative pl-6">
              {/* Timeline Line */}
              <div className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-gray-100 border-l-2 border-dashed border-gray-200"></div>
              
              {/* Pick-up */}
              <div className="mb-6 relative">
                <div className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-white"></div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-gray-50 rounded-full shrink-0">
                      <MapPin size={18} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Pick-up</p>
                      <p className="text-sm font-bold text-gray-900">New York Airport (JFK)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">May 20, 2024</p>
                    <p className="text-[10px] text-gray-400 font-medium">10:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Drop-off */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-yellow-500 ring-4 ring-white"></div>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-gray-50 rounded-full shrink-0">
                      <MapPin size={18} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Drop-off</p>
                      <p className="text-sm font-bold text-gray-900">New York Airport (JFK)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">May 23, 2024</p>
                    <p className="text-[10px] text-gray-400 font-medium">10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Details */}
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm mb-8 lg:mb-0">
            <h3 className="font-bold text-gray-900 text-sm mb-5">Vehicle Details</h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-start gap-3">
                <Droplet size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Fuel Type</p>
                  <p className="text-xs font-bold text-gray-900">Petrol</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gauge size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Engine</p>
                  <p className="text-xs font-bold text-gray-900">3.0L</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gauge size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Mileage</p>
                  <p className="text-xs font-bold text-gray-900">12 km/l</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Settings size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Transmission</p>
                  <p className="text-xs font-bold text-gray-900">Automatic</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CarFront size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Doors</p>
                  <p className="text-xs font-bold text-gray-900">5</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Luggage</p>
                  <p className="text-xs font-bold text-gray-900">2 Bags</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wind size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Air Conditioning</p>
                  <p className="text-xs font-bold text-gray-900">Yes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bluetooth size={20} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">Bluetooth</p>
                  <p className="text-xs font-bold text-gray-900">Yes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column / Desktop Sticky Sidebar */}
        <div className="lg:w-[350px] shrink-0 hidden lg:block">
           <div className="sticky top-24 bg-white border border-gray-100 shadow-xl rounded-[2rem] p-6">
             <h3 className="font-bold text-xl text-gray-900 mb-6">Booking Summary</h3>
             <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-4">
               <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-blue-600">$360</span>
                    <Info size={16} className="text-gray-300" />
                  </div>
                  <p className="text-xs text-gray-400">for 3 days</p>
               </div>
             </div>
             
             <ul className="text-sm text-gray-600 mb-6 space-y-3">
                <li className="flex justify-between"><span className="font-medium">Car Rental Fare</span> <span>$360</span></li>
                <li className="flex justify-between"><span className="font-medium">Taxes & Fees</span> <span className="text-green-600">Included</span></li>
             </ul>

             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-200">
                Continue to Book
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </button>
           </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-7xl mx-auto bg-white border-t border-gray-100 px-5 py-4 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] lg:hidden">
        <div>
          <p className="text-xs font-bold text-gray-900 mb-0.5">Total Price</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-blue-600">$360</span>
            <Info size={16} className="text-gray-300 relative top-0.5" />
          </div>
          <p className="text-[10px] text-gray-400 font-medium">for 3 days</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-200 text-sm">
          Continue to Book
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
