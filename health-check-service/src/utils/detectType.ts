import { HealthCheckType } from "models/cameraCheck.model";

export function detectType(url: string): HealthCheckType {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.startsWith('rtsp://')) return 'RTSP';
  if (lowerUrl.startsWith('http://') || lowerUrl.startsWith('https://')) return 'HTTP';

  return 'PING';
}
