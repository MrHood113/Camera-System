import React, { useCallback, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationMarker from './LocationMaker';
import type { LocationMarkerProps } from '../types/mapPicker.type';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultCenter = { lat: 15.97901801986256, lng: 108.26205786589402 }; 
const defaultZoom = 5;

const MapPicker: React.FC<LocationMarkerProps> = ({ onLocationSelected, defaultLatLng }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(defaultLatLng ?? null);
  const mapRef = useRef<L.Map | null>(null);

  const handleSelect = useCallback(
    async (lat: number, lng: number, timeZone: string) => {
      setMarker({ lat, lng });
      onLocationSelected(lat, lng, timeZone);
    },
    [onLocationSelected]
  );

  return (
    <div className="w-full h-full rounded-md border border-gray-300 shadow-md overflow-hidden">
      <MapContainer
        ref={(ref) => {
          if (ref) {
            mapRef.current = ref;
          }
        }}
        whenReady={() => {
          setTimeout(() => {
            mapRef.current?.invalidateSize();
          }, 200);
        }}
        center={marker ?? defaultLatLng ?? defaultCenter}
        zoom={marker ? 12 : defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {marker && (
          <Marker position={marker}>
            <Popup>
              <p className="text-sm">Lat: {marker.lat.toFixed(5)}</p>
              <p className="text-sm">Lng: {marker.lng.toFixed(5)}</p>
            </Popup>
          </Marker>
        )}

        <LocationMarker onLocationSelected={handleSelect} />
      </MapContainer>
    </div>
  );
};

export default React.memo(MapPicker);
