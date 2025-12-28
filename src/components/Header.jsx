import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-10 relative z-10">
      <div className="inline-block relative">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight mb-2">
          Delhi Local Guide
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 ml-2">AI</span>
        </h1>
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-white to-green-500 rounded-full opacity-80 mt-1"></div>
      </div>
      <p className="mt-4 text-gray-500 max-w-lg mx-auto text-lg font-medium">
        Area Vibes • Street Food • Metro Tips • Festival Radar
      </p>

      <div className="absolute top-0 right-0 -z-10 opacity-10 transform translate-x-10 -translate-y-10">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="#6366f1" />
        </svg>
      </div>
    </div>
  );
};

export default Header;