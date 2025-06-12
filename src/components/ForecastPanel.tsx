import { useWeatherContext } from '../context/WeatherDataContext';
import { transformDailyData } from '../utils/transformDailyData';
import Chart from 'react-apexcharts';
import WeatherIcon from './WeatherIcon';
import { getWeatherLabel } from '../utils/getWeatherLabel';
import { dateStringToWeekDay } from '../utils/dateToWeekDay';
import { getChartConfig } from '../utils/getChartConfig';

export default function ForecastPanel() {
  const { weatherData } = useWeatherContext();

  const upcomingWeekData = weatherData
    ? transformDailyData(weatherData?.daily)
    : [];

  const TMP_MIN_UNIT = weatherData?.current_units?.temperature_2m || '°C';
  const TMP_MAX_UNIT = weatherData?.daily_units?.temperature_2m_max || '°C';

  const chartConfig = getChartConfig(
    upcomingWeekData.map(d => dateStringToWeekDay(d.time, 'short')),
    upcomingWeekData.map(d => d.temperature_2m_max),
  );

  return (
    <div className="flex flex-col gap-2 lg:gap-4 w-full lg:mx-8">
      {upcomingWeekData.map(d => (
        <div className="grid grid-cols-3 p-2 mb-2 rounded-md bg-white/10 hover:bg-white/20">
          <p>{dateStringToWeekDay(d.time, 'long')}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-white">
            <span>
              <WeatherIcon
                label={getWeatherLabel(
                  d.rain_sum,
                  d.snowfall_sum,
                  d.cloud_cover_mean,
                  true,
                )}
              />
            </span>
            <span> {d.precipitation_probability_max}% </span>
          </div>
          <div className="flex justify-end">
            <span>{d.temperature_2m_min + TMP_MIN_UNIT}</span>
            <span> / </span>
            <span>{d.temperature_2m_max + TMP_MAX_UNIT}</span>
          </div>
        </div>
      ))}
      <div className="mt-8 lg:px-24 w-full rounded-3xl">
        <Chart {...chartConfig} />
      </div>
    </div>
  );
}
