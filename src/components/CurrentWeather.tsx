import CitySelectorModal from './CitySelectorModal';
import WeatherIcon from './WeatherIcon';
import { getWeatherLabel } from '../utils/getWeatherLabel';
import { useCurrentWeather } from '../hooks/useCurrentWeather';

export default function CurrentWeather() {
  const {
    isLoading,
    data,
    error,
    location,
    shouldShowCitySelectorModal,
    openModal,
    closeModal,
    handleCitySelect,
  } = useCurrentWeather();

  const safeSelectedCity = location?.name || 'Select...';

  const currentTemperature =
    data?.current?.temperature_2m + data?.current_units?.temperature_2m || '--';

  const weatherLabel = getWeatherLabel(
    data?.current?.rain || 0,
    data?.current?.snowfall || 0,
    data?.current?.cloud_cover || 0,
    data?.current?.is_day || 0,
  );

  if (error) {
    return (
      <p className="text-red-700 font-bold text-xl">
        An error occured while loading data, please try to refresh the page!
      </p>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-4 items-center md:items-start">
      <div>
        {shouldShowCitySelectorModal && (
          <CitySelectorModal
            onClose={closeModal}
            onSelectCity={handleCitySelect}
          />
        )}
        <button
          className="underline hover:scale-105 transition-transform duration-300 text-lg"
          onClick={openModal}
        >
          {safeSelectedCity}
        </button>
        <div className="text-4xl">{currentTemperature}</div>
      </div>

      <WeatherIcon width={32} height={32} label={weatherLabel} />
    </div>
  );
}
