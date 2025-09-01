export type HealthCheckType = 'PING' | 'HTTP' | 'RTSP';

export interface CameraHealthCheck {
  id: number;
  ipAddress: string;
  streamUrl: string;
  healthCheckTypeEnum: HealthCheckType;
}