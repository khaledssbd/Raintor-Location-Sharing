'use client';

import { useEffect, useRef, useState } from 'react';
import type { LocationData } from '@/types/location';

interface MapViewProps {
  locations: LocationData[];
}

export default function MapView({ locations }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [LRef, setLRef] = useState<typeof import('leaflet') | null>(null);

  // Dynamically import Leaflet only on client
  useEffect(() => {
    const loadLeaflet = async () => {
      const L = (await import('leaflet')).default;

      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      setLRef(L);
    };

    loadLeaflet();
  }, []);

  // Initialize map once L and container are ready
  useEffect(() => {
    if (!LRef || !mapRef.current || mapInstanceRef.current) return;

    const map = LRef.map(mapRef.current, {
      center: [40.7128, -74.006],
      zoom: 10,
      scrollWheelZoom: true,
    });

    LRef.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [LRef]);

  // Update markers when locations change
  useEffect(() => {
    if (!LRef || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Remove previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    locations.forEach(loc => {
      const marker = LRef.marker([loc.lat, loc.lon]).addTo(map).bindPopup(`
          <div>
            <strong>${loc.userName}</strong><br>
            Lat: ${loc.lat.toFixed(6)}<br>
            Lon: ${loc.lon.toFixed(6)}<br>
            <small>Updated: ${
              loc.timestamp
                ? new Date(loc.timestamp).toLocaleTimeString()
                : 'N/A'
            }</small>
          </div>
        `);

      markersRef.current.push(marker);
    });

    // Fit map to show all markers if locations exist
    if (locations.length > 0) {
      const group = LRef.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [locations, LRef]);

 return (
   <div className="space-y-4">
     <div
       ref={mapRef}
       className="relative w-full max-h-screen rounded-lg border overflow-hidden"
     />

     {locations.length === 0 && (
       <div className="text-center py-8 text-gray-500">
         <p>No active locations. Send a location to see it on the map!</p>
       </div>
     )}

     {locations.length > 0 && (
       <div className="space-y-2">
         <h3 className="font-semibold">
           Active Locations ({locations.length})
         </h3>
         <div className="grid gap-2">
           {locations.map((location, index) => (
             <div
               key={index}
               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
             >
               <div>
                 <span className="font-medium">{location.userName}</span>
                 <div className="text-sm text-gray-600">
                   {location.lat.toFixed(6)}, {location.lon.toFixed(6)}
                 </div>
               </div>
               <div className="text-xs text-gray-500">
                 {location.timestamp
                   ? new Date(location.timestamp).toLocaleTimeString()
                   : 'N/A'}
               </div>
             </div>
           ))}
         </div>
       </div>
     )}
   </div>
 );

}
