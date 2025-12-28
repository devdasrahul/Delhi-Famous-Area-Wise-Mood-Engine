import React, { useEffect, useState } from 'react';

const MetroStrip = ({ source, destination, sourceLine, destLine }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Reset and start animation
        setProgress(0);
        const timer = setTimeout(() => setProgress(100), 100);
        return () => clearTimeout(timer);
    }, [source, destination]);

    return (
        <div className="w-full glass rounded-3xl p-6 relative overflow-hidden">

            {/* Route Info */}
            <div className="flex justify-between items-end mb-6 relative z-10">
                <div className="text-left">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Start</p>
                    <h3 className="text-2xl font-bold text-gray-800">{source}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700 mt-1`}>
                        {sourceLine || 'Metro Station'}
                    </span>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">End</p>
                    <h3 className="text-2xl font-bold text-gray-800">{destination}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700 mt-1`}>
                        {destLine || 'Metro Station'}
                    </span>
                </div>
            </div>

            {/* Visual Strip */}
            <div className="relative h-2 bg-gray-200 rounded-full mt-2 mb-4">
                {/* Animated Progress Bar */}
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />

                {/* Points */}
                <div className="absolute top-1/2 left-0 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white transform -translate-y-1/2 -translate-x-1/2 shadow-sm" />
                <div className="absolute top-1/2 right-0 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white transform -translate-y-1/2 translate-x-1/2 shadow-sm" />
            </div>

            <p className="text-center text-xs text-indigo-500 font-medium animate-pulse">
                Estimated Travel: Smooth Ride 🚇
            </p>

        </div>
    );
};

export default MetroStrip;
