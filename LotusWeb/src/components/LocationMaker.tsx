import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { fetchTimeZone } from '../utils/fetchTimeZone';
import type { LocationMarkerProps } from '../types/mapPicker.type';

const LocationMarker: React.FC<LocationMarkerProps> = ({ onLocationSelected }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useMapEvents({
    click: async (event) => {
      const { lat, lng } = event.latlng;
      setPosition({ lat, lng });

      const timeZone = await fetchTimeZone(lat, lng);
      if (timeZone) {
        onLocationSelected(lat, lng, timeZone);
      }
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        <p className="text-sm">Lat: {position.lat.toFixed(5)}</p>
        <p className="text-sm">Lng: {position.lng.toFixed(5)}</p>
      </Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;
