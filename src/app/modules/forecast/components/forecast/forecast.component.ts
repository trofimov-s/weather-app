import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { ForecastHelperService } from '../../service';
import { Weather, WeatherData } from '@core/model/forecast';
import { UNITS } from '@modules/forecast';
import { SubscriptionDetacher } from '@core/utils';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit, OnDestroy {
  private detacher = new SubscriptionDetacher();
  public forecast: WeatherData;
  public unit$: Observable<UNITS>;
  public isLoading$: Observable<boolean>;
  public isError$: Observable<boolean>;
  public selectedDayForecasts$ = new BehaviorSubject<Array<Weather>>(null);
  public favoriteCities$: Observable<string[]>;

  constructor(private forecastHelper: ForecastHelperService) {}

  public ngOnInit(): void {
    this.isLoading$ = this.forecastHelper.isLoading$;
    this.isError$ = this.forecastHelper.isError$;
    this.unit$ = this.forecastHelper.unit$;
    this.favoriteCities$ = this.forecastHelper.favoriteCities$;

    this.forecastHelper.init();
    this.forecastHelper.forecast$
      .pipe(
        tap(({ keys, list }) => this.selectedDayForecasts$.next(list[keys[0]])),
        this.detacher.takeUntilDetach(),
      )
      .subscribe((data) => (this.forecast = data));
  }

  public ngOnDestroy(): void {
    this.detacher.detach();
  }

  public onSelectDay(date: string): void {
    this.selectedDayForecasts$.next(this.forecast.list[date]);
  }
}
