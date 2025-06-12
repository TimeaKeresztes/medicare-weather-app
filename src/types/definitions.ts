export type City = {
  name: string;
  latitude: number;
  longitude: number;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type WeatherLabel = 'Clear' | 'Cloudy' | 'Rainy' | 'Snowy' | 'Night';

export type WeatherApiResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    precipitation: string;
    temperature_2m: string;
    cloud_cover: string;
    rain: string;
    snowfall: string;
  };
  current: {
    time: string;
    interval: number;
    precipitation: number;
    temperature_2m: number;
    cloud_cover: number;
    rain: number;
    snowfall: number;
    is_day: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weather_code: string;
    precipitation_probability_max: string;
    rain_sum: string;
    snowfall_sum: string;
    cloud_cover_mean: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
    rain_sum: number[];
    snowfall_sum: number[];
    cloud_cover_mean: number[];
  };
};
