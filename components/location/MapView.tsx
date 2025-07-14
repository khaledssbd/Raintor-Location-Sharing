'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, DivIcon, point, LatLngExpression, LatLngBounds } from 'leaflet';
import type { LocationData } from '@/types/location';

interface LocationProps {
  locations: LocationData[];
}

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const createClusterCustomIcon = (cluster: any) => {
  return new DivIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });
};

// Helper to auto-fit bounds to markers
function FitBounds({ locations }: { locations: LocationData[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = new LatLngBounds(
        locations.map(loc => [loc.lat, loc.lon] as LatLngExpression)
      );
      map.fitBounds(bounds.pad(0.2));
    }
  }, [locations, map]);

  return null;
}

export default function MapView({ locations }: LocationProps) {
  return (
    <div className="space-y-6 my-12 mx-4">
      {locations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No active locations. Send a location to see it on the map!</p>
        </div>
      ) : (
        <>
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={6}
            className="w-full h-[600px] rounded-2xl border border-gray-300 shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds locations={locations} />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.lon]}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <strong>{location.userName}</strong>
                      <br />
                      Lat: {location.lat.toFixed(6)}
                      <br />
                      Lon: {location.lon.toFixed(6)}
                      <br />
                      <small>
                        Updated:{' '}
                        {location.timestamp
                          ? new Date(location.timestamp).toLocaleTimeString()
                          : 'N/A'}
                      </small>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">
              Active Locations ({locations.length})
            </h4>
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
        </>
      )}
    </div>
  );
}
