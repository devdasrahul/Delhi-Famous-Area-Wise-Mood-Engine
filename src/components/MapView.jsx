import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ coordinates, areaName }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!coordinates || !mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(coordinates, 14);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add marker for the area
    const marker = L.marker(coordinates).addTo(mapInstanceRef.current);
    marker.bindPopup(`
      <div class="text-center">
        <h3 class="font-semibold text-gray-800">${areaName}</h3>
        <p class="text-sm text-gray-600 mt-1">📍 Delhi, India</p>
      </div>
    `).openPopup();

    // Set view to coordinates
    mapInstanceRef.current.setView(coordinates, 14);

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, areaName]);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gray-50 px-4 py-2 border-b">
        <h4 className="text-sm font-medium text-gray-700">
          📍 {areaName} Location
        </h4>
      </div>
      <div 
        ref={mapRef} 
        className="h-64 w-full"
        style={{ minHeight: '256px' }}
      />
      <div className="bg-gray-50 px-4 py-2 border-t">
        <p className="text-xs text-gray-500">
          🗺️ Interactive map powered by OpenStreetMap
        </p>
      </div>
    </div>
  );
};

export default MapView;