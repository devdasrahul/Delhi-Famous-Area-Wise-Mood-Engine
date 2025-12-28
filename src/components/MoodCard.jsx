import React from 'react';

const MoodCard = ({ title, icon, content, colorClass }) => {
    return (
        <div className={`p-5 rounded-2xl ${colorClass} bg-opacity-10 border border-opacity-20 border-gray-200 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{icon}</span>
                <h4 className="font-bold text-gray-800 uppercase tracking-wider text-xs">{title}</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                {content}
            </p>
        </div>
    );
};

export default MoodCard;
