export async function fetchTimeZone(lat: number, lng: number): Promise<string | null> {
  const apiKey = import.meta.env.VITE_TIMEZONEDB_API_KEY;
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      return data.zoneName; //
    } else {
      console.error('TimeZoneDB error:', data.message || data);
      return null;
    }
  } catch (err) {
    console.error('Failed to fetch timezone from TimeZoneDB:', err);
    return null;
  }
}
