import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useWeatherContext } from '../context/WeatherDataContext';
import type { City } from '../types/definitions';
import { getStoredCity, setStoredCity } from '../utils/city';
import { getWeatherData } from '../utils/weatherData';

export function useCurrentWeather() {
  const initialCity = getStoredCity();

  const { setWeatherData } = useWeatherContext();

  const [location, setLocation] = useState<City | undefined>(initialCity);
  const [shouldShowCitySelectorModal, setShouldShowCitySelectorModal] =
    useState(!initialCity);

  function openModal() {
    setShouldShowCitySelectorModal(true);
  }

  function closeModal() {
    setShouldShowCitySelectorModal(false);
  }

  async function handleCitySelect(city?: City) {
    setLocation(city);
    setStoredCity(city);
    setShouldShowCitySelectorModal(false);

    if (!city) return;

    const weatherData = await getWeatherData(city.latitude, city.longitude);
    setWeatherData(weatherData);
  }

  const { isLoading, data, error } = useQuery({
    queryKey: ['weatherData', location?.name],
    queryFn: async () => {
      const data = await getWeatherData(
        location?.latitude,
        location?.longitude,
      );
      return data;
    },
    enabled: !!location,
  });

  return {
    isLoading,
    data,
    error,
    location,
    shouldShowCitySelectorModal,
    openModal,
    closeModal,
    handleCitySelect,
  };
}
