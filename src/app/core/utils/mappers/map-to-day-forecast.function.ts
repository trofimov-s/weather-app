import { DayForecast, Weather, WeatherData } from '@core/model/forecast';
import { getAverageDayDegrees } from '../functions/min-max-day-degrees.function';

export function mapToDayForecast(weatherData: WeatherData): DayForecast[] {
  return weatherData.keys.map((date: string) => {
    const dayForecasts: Weather[] = weatherData.list[date];
    const temp_min = getAverageDayDegrees(dayForecasts, 'temp_min', 'min');
    const temp_max = getAverageDayDegrees(dayForecasts, 'temp_max', 'max');
    const temp = getAverageDayDegrees(dayForecasts, 'temp', 'average');

    const averageLength = Math.floor(dayForecasts.length / 2);

    const { main, icon } = weatherData.list[date][averageLength];

    return {
      date,
      temp_min,
      temp_max,
      main,
      icon,
      temp,
      location: weatherData.location,
    } as DayForecast;
  });
}
