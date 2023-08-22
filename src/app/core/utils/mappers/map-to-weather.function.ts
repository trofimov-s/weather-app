import { WeatherListItem } from '@core/model/api';
import { Weather } from '@core/model/forecast';

export function mapToWeather(item: WeatherListItem): Weather {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    weather,
    dt_txt,
  } = item;
  const { main, description, icon } = weather[0];

  return {
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    temp_min: Math.round(temp_min),
    temp_max: Math.round(temp_max),
    humidity,
    main,
    description,
    icon,
    date: dt_txt,
  };
}
