import React from 'react';

const FloatingCard = ({ name, contextInfo, onClick, index }) => {
    const vibe = contextInfo?.crowdVibe?.split(',')[0] || "Explore this area";

    // Staggered float animation
    const animationClass = index % 2 === 0 ? 'animate-float' : 'animate-float-delayed';

    return (
        <button
            onClick={onClick}
            className={`
        relative w-full text-left p-6 rounded-3xl transition-all duration-500 group
        glass-card ${animationClass}
        hover:scale-105
      `}
        >
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center text-2xl shadow-inner">
                        📍
                    </div>
                    <span className="text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">EXPLORE</span>
                </div>

                <div>
                    <h3 className="text-xl font-extrabold text-gray-800 leading-tight group-hover:text-indigo-600 transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                        {vibe}
                    </p>
                </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-indigo-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10" />
        </button>
    );
};

export default FloatingCard;
