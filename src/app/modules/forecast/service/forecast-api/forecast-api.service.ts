import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Query, WeatherResponse } from '@core/model/api';
import { RootApi } from '@core/service';
import { UNITS } from '../../enum';
import { Weather, WeatherData } from '@core/model/forecast';
import { mapToWeather, toDictionary } from '@core/utils';
import { Dictionary } from '@core/model/shared';

@Injectable()
export class ForecastApiService extends RootApi {
  constructor(http: HttpClient) {
    super(http);
  }

  public getWeatherForecast(
    city: string,
    units = UNITS.STANDARD,
    cnt?: number,
  ): Observable<WeatherData> {
    const query: Query = { q: city, units, cnt };
    return this.http.get<WeatherResponse>(this.buildUrl((u) => u.weatherApiUrl, query)).pipe(
      map(({ list, city: { name, country } }: WeatherResponse): WeatherData => {
        const weatherList: Array<Weather> = list.map((item) => mapToWeather(item));
        const weatherDictionary: Dictionary<Array<Weather>> = toDictionary<Weather>(
          weatherList,
          (e) => e.date,
          (v) => v.split(' ')[0],
        );
        const keys = Object.keys(weatherDictionary);

        return {
          keys,
          list: weatherDictionary,
          location: `${name},${country}`,
        };
      }),
    );
  }
}
