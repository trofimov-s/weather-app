import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { DayForecast, WeatherData } from '@core/model/forecast';
import { mapToDayForecast } from '@core/utils';
import { ForecastHelperService, UNITS } from '@modules/forecast';

@Component({
  selector: 'app-favorite-forecast',
  templateUrl: './favorite-forecast.component.html',
  styleUrls: ['./favorite-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteForecastComponent implements OnInit {
  public favoriteCitiesForecast$: Observable<DayForecast[]>;

  @Input({ required: true })
  public unit: UNITS;

  constructor(private forecastHelper: ForecastHelperService) {}

  public ngOnInit(): void {
    this.favoriteCitiesForecast$ = this.forecastHelper.favoriteCitiesForecast$.pipe(
      map((forecasts: WeatherData[]) =>
        forecasts.map((forecast: WeatherData): DayForecast => mapToDayForecast(forecast)[0]),
      ),
    );
  }

  public trackBy(_: number, item: DayForecast): string {
    return item.location;
  }

  public removeFromFavorite(forecast: DayForecast): void {
    this.forecastHelper.removeFromFavorite(forecast.location.split(',')[0].toLowerCase());
  }
}
