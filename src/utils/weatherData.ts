function getUrlByCoordinates(lat: number, long: number) {
  const rootUrl = 'https://api.open-meteo.com/v1/forecast';
  const latitudeQueryParam = `?latitude=${lat}`;
  const longitudeQueryParam = `&longitude=${long}`;
  const dailyQueryParam = `&daily=cloud_cover_mean,rain_sum,snowfall_sum,temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max`;
  const currentQueryParam = `&current=precipitation,temperature_2m,cloud_cover,rain,snowfall,is_day`;

  return `${rootUrl}${latitudeQueryParam}${longitudeQueryParam}${dailyQueryParam}${currentQueryParam}`;
}

export async function getWeatherData(lat?: number, long?: number) {
  if (!lat || !long) {
    return;
  }
  const url = getUrlByCoordinates(lat, long);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
