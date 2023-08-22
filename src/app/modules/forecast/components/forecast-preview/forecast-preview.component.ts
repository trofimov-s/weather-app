import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Weather } from '@core/model/forecast';
import { UNITS } from '../../enum';
import { ForecastHelperService } from '../../service';

@Component({
  selector: 'app-forecast-preview',
  templateUrl: './forecast-preview.component.html',
  styleUrls: ['./forecast-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastPreviewComponent {
  private _selectedDayForecasts: Array<Weather>;

  public get selectedDayForecasts(): Array<Weather> {
    return this._selectedDayForecasts;
  }

  @Input({ required: true })
  public set selectedDayForecasts(forecast: Array<Weather>) {
    this._selectedDayForecasts = forecast;
    this.selectedTimeForecast$.next(forecast[0]);
  }

  @Input()
  public favoriteCities: string[];

  public get isCityFavorite(): boolean {
    return this.favoriteCities?.includes(this.location.split(',')[0].toLowerCase());
  }

  @Input({ required: true })
  public location: string;

  @Input({ required: true })
  public unit: UNITS;

  public selectedTimeForecast$ = new BehaviorSubject<Weather>(null);

  constructor(private forecastHelper: ForecastHelperService) {}

  public onSelectTime(index: number): void {
    this.selectedTimeForecast$.next(this.selectedDayForecasts[index]);
  }

  public toggleFavorite(): void {
    this.isCityFavorite
      ? this.forecastHelper.removeFromFavorite(this.location.split(',')[0].toLowerCase())
      : this.forecastHelper.addToFavorite(this.location.split(',')[0].toLowerCase());
  }
}
