import { Dictionary } from '../shared';

export interface Weather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  main: string;
  description: string;
  icon: string;
  date: string;
}

export interface WeatherData {
  keys: Array<string>;
  location: string;
  list: Dictionary<Array<Weather>>;
}
