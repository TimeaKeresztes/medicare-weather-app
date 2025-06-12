import type { City } from '../types/definitions';

const CITY_LOCALSTORAGE_KEY = 'city';

export function getStoredCity(): City | undefined {
  const storedCity = window.localStorage.getItem(CITY_LOCALSTORAGE_KEY);
  if (!storedCity) {
    return undefined;
  }
  const parsedCity: City = JSON.parse(storedCity);
  return parsedCity;
}
export function setStoredCity(city?: City) {
  if (!city) {
    window.localStorage.removeItem(CITY_LOCALSTORAGE_KEY);
    return;
  }
  window.localStorage.setItem(CITY_LOCALSTORAGE_KEY, JSON.stringify(city));
}

export async function fetchCities(
  filterString?: string,
): Promise<City[] | undefined> {
  const safeFilterString = filterString?.trim();
  if (!safeFilterString || safeFilterString.length < 1) {
    return [];
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${safeFilterString}&count=10&language=en&format=json`,
    );

    const data = await response.json();

    if (!data.results) {
      return [];
    }

    return data.results.map(({ latitude, longitude, name }: City) => ({
      name,
      latitude,
      longitude,
    }));
  } catch (e) {
    console.error(e);
  }
}
