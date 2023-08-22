import { Weather } from '@core/model/forecast';
import { DataListOption } from '@core/model/shared';

export const forecastFullViewDetails: DataListOption<Weather>[] = [
  {
    title: 'Feels like',
    key: 'feels_like',
    type: 'units',
  },
  {
    title: 'Min',
    key: 'temp_min',
    type: 'units',
  },
  {
    title: 'Max',
    key: 'temp_max',
    type: 'units',
  },
  {
    title: 'Humidity',
    key: 'humidity',
  },
  {
    title: 'Description',
    key: 'description',
  },
];
