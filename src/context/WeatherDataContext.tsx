import { createContext, useContext, useEffect, useState } from 'react';
import type { WeatherApiResponse } from '../types/definitions';
import { getWeatherData } from '../utils/weatherData';
import { getStoredCity } from '../utils/city';

type WeatherDataContextType = {
  weatherData: WeatherApiResponse | null;
  setWeatherData: (weatherData: WeatherApiResponse | null) => void;
};

const WeatherContext = createContext<WeatherDataContextType | null>(null);

export function WeatherDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null,
  );

  useEffect(() => {
    const storedCity = getStoredCity();
    if (!storedCity) {
      return;
    }
    getWeatherData(storedCity.latitude, storedCity.longitude).then(data => {
      setWeatherData(data);
    });
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWeatherContext() {
  const currentUserContext = useContext(WeatherContext);

  if (!currentUserContext) {
    throw new Error(
      'useCurrentUser has to be used within <CurrentUserContext.Provider>',
    );
  }

  return currentUserContext;
}
