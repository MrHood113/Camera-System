import { DateTime } from 'luxon';


// Convert ZoneId (IANA format) to  UTC±hh:mm

export function getUTCOffset(zoneId: string): string {
  try {
    const dt = DateTime.now().setZone(zoneId);
    return `UTC${dt.toFormat('Z')}`;
  } catch (e) {
    console.warn(`Invalid timezone: ${zoneId}`, e);
    return zoneId;
  }
}
