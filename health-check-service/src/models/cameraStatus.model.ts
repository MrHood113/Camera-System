export type HealthStatus = 'UNKNOWN' | 'ONLINE' | 'OFFLINE' | 'UNREACHABLE';

export interface CameraHealthStatus {
  healthStatusEnum: HealthStatus;
  note?: string;
  lastPingAt: string;
}