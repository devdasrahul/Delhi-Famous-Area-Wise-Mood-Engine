import React from 'react';

const AreaCard = ({ name, contextInfo, onClick, isSelected }) => {
    // Extract vibe for subtitle
    const vibe = contextInfo?.crowdVibe?.split(',')[0] || "Explore this area";

    return (
        <button
            onClick={onClick}
            className={`
        relative w-full text-left p-4 rounded-2xl transition-all duration-300 group
        ${isSelected
                    ? 'bg-gradient-to-br from-indigo-50 to-white ring-2 ring-indigo-500 shadow-xl scale-[1.02] z-10'
                    : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-xl hover:-translate-y-1'
                }
      `}
        >
            <div className="flex items-center space-x-4">
                <div className={`
          w-12 h-12 rounded-full flex items-center justify-center text-2xl
          ${isSelected ? 'bg-indigo-100' : 'bg-gray-100 group-hover:bg-indigo-50'}
          transition-colors
        `}>
                    📍
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${isSelected ? 'text-indigo-900' : 'text-gray-800'}`}>
                        {name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {vibe}
                    </p>
                </div>

                {isSelected && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                )}
            </div>
        </button>
    );
};

export default AreaCard;
