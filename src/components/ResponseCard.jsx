import React, { useState } from 'react';
import MapView from './MapView';

const ResponseCard = ({ response }) => {
  const [showMap, setShowMap] = useState(false);

  if (!response) return null;

  const getCardIcon = (type) => {
    switch (type) {
      case 'area': return '🗺️';
      case 'slang': return '🗣️';
      case 'food': return '🍽️';
      case 'traffic': return '🚦';
      case 'festival': return '🎉';
      default: return '💬';
    }
  };

  const getCardTitle = (type) => {
    switch (type) {
      case 'area': return 'Area Guide';
      case 'slang': return 'Delhi Slang';
      case 'food': return 'Food Recommendations';
      case 'traffic': return 'Traffic & Transport';
      case 'festival': return 'Festival Info';
      default: return 'Delhi Local Guide';
    }
  };

  return (
    <div className="chat-bubble glass-effect rounded-2xl p-6 shadow-3d hover:shadow-3d-hover transition-all duration-300 mb-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{getCardIcon(response.type)}</span>
        <h3 className="text-lg font-semibold text-gray-800">
          {getCardTitle(response.type)}
        </h3>
        {response.area && (
          <span className="ml-auto text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            {response.area}
          </span>
        )}
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-line text-gray-700 leading-relaxed">
          {response.response}
        </div>
      </div>

      {/* Special sections for area responses */}
      {response.type === 'area' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-medium text-blue-800 mb-2">🧍 Crowd Vibe</h4>
            <p className="text-sm text-blue-700">{response.crowdVibe}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <h4 className="font-medium text-green-800 mb-2">🍽️ Food Mood</h4>
            <p className="text-sm text-green-700">{response.foodMood}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-medium text-purple-800 mb-2">🚇 Travel Tips</h4>
            <p className="text-sm text-purple-700">{response.travelTips}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <h4 className="font-medium text-orange-800 mb-2">⏰ Peak Times</h4>
            <p className="text-sm text-orange-700">{response.peakTimes}</p>
          </div>
        </div>
      )}

      {/* Map toggle for area responses */}
      {response.coordinates && (
        <div className="mt-6">
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <span>{showMap ? '🗺️ Hide Map' : '🗺️ Show on Map'}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${showMap ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showMap && (
            <div className="mt-4">
              <MapView 
                coordinates={response.coordinates} 
                areaName={response.area}
              />
            </div>
          )}
        </div>
      )}

      {/* Slang term highlight */}
      {response.type === 'slang' && response.slangTerm && (
        <div className="mt-4 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
          <div className="flex items-center">
            <span className="text-yellow-600 font-medium">💡 Quick Reference:</span>
          </div>
          <div className="mt-2">
            <span className="font-semibold text-gray-800">"{response.slangTerm}"</span>
            <span className="text-gray-600"> = {response.meaning}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseCard;