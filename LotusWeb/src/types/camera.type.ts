export interface Camera {
  id: number;
  name: string;  // Not null

  latitude: number;
  longitude: number;

  country: string; // Not null
  city: string; // Not null
  countryCode: string;
  zipCode: string;  

  timezone: string;  
  ipAddress: string;  // Not null
  streamUrl: string;

  healthStatusEnum: 'ONLINE' | 'OFFLINE' | 'UNKNOWN'; 
  isActive: boolean; // Not null
  healthCheckTypeEnum: 'PING' | 'RTSP' | 'HTTP' | null;

  lastPingAt: string | null;
  lastStatusChangeAt: string | null;


  description?: string;
  note?: string;
}

export type StreamCamera = Pick<Camera, 'id' | 'name' | 'country' | 'city' | 'streamUrl' | 'healthCheckTypeEnum'>;