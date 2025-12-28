import React from 'react';

const InsightBlock = ({ title, icon, content, delay, color }) => {
    return (
        <div
            className="glass-card rounded-3xl p-6 flex flex-col items-center text-center h-full animate-enter"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-4 ${color} bg-opacity-20 text-gray-800`}>
                {icon}
            </div>
            <h3 className="font-bold text-gray-800 uppercase tracking-wider text-xs mb-3">{title}</h3>
            <div className="text-gray-600 font-medium text-lg leading-snug whitespace-pre-line">
                {content}
            </div>
        </div>
    );
};

export default InsightBlock;
