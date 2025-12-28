import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="glass-effect rounded-2xl p-8 shadow-3d mb-6">
      <div className="flex items-center justify-center space-x-3">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-gray-600">
          <p className="font-medium">Your Delhi local is thinking...</p>
          <p className="text-sm text-gray-500">Getting the latest city vibes 🇮🇳</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center space-x-2">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;