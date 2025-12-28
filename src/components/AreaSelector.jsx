import React from 'react';

const AreaSelector = ({ selectedArea, onAreaChange, areas }) => {
  return (
    <div className="glass-effect rounded-2xl p-6 shadow-3d mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        🗺️ Select Delhi Area (Optional)
      </label>
      <select
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
      >
        <option value="">Choose an area...</option>
        {areas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">
        Select an area for location-specific recommendations, or leave blank for general queries
      </p>
    </div>
  );
};

export default AreaSelector;