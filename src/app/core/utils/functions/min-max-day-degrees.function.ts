import { Weather } from '@core/model/forecast';

export function getAverageDayDegrees(
  weatherData: Weather[],
  key: keyof Weather,
  type: 'min' | 'max' | 'average',
): number {
  const degrees: number[] = weatherData.map((item) => item[key] as number);

  switch (type) {
    case 'min':
      return Math.min(...degrees);

    case 'max':
      return Math.max(...degrees);

    default:
      return Math.round(degrees.reduce((prev, curr) => prev + curr) / degrees.length);
  }
}
