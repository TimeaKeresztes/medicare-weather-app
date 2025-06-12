import type { WeatherApiResponse } from '../types/definitions';

export function transformDailyData(daily: WeatherApiResponse['daily']) {
  const length = daily.time.length;
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push({
      time: daily.time[i],
      temperature_2m_max: Math.round(daily.temperature_2m_max[i]),
      temperature_2m_min: Math.round(daily.temperature_2m_min[i]),
      weather_code: daily.weather_code[i],
      precipitation_probability_max: daily.precipitation_probability_max[i],
      rain_sum: Math.round(daily.rain_sum[i]),
      snowfall_sum: Math.round(daily.snowfall_sum[i]),
      cloud_cover_mean: Math.round(daily.cloud_cover_mean[i]),
    });
  }

  return result;
}
