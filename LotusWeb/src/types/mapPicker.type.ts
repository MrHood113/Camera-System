export type LocationMarkerProps = {
  onLocationSelected: (lat: number, lng: number, timeZone: string) => void;
  defaultLatLng?: { lat: number; lng: number };
  mapRef?: React.RefObject<L.Map | null>;
};

