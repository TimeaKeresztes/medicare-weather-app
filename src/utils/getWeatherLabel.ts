import type { WeatherLabel } from '../types/definitions';

export function getWeatherLabel(
  rain: number,
  snow: number,
  cloud_cover: number,
  is_day = true,
): WeatherLabel {
  if (rain > 0) {
    return 'Rainy';
  }
  if (snow > 0) {
    return 'Snowy';
  }
  if (cloud_cover > 50) {
    return 'Cloudy';
  }
  return is_day ? 'Clear' : 'Night';
}
