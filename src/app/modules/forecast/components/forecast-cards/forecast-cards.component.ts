import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DayForecast, WeatherData } from '@core/model/forecast';
import { mapToDayForecast } from '@core/utils';
import { UNITS } from '../../enum';

@Component({
  selector: 'app-forecast-cards',
  templateUrl: './forecast-cards.component.html',
  styleUrls: ['./forecast-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastCardsComponent {
  private _dayForecast: DayForecast[];

  @Input({
    required: true,
    alias: 'forecast',
    transform: (data: WeatherData) => mapToDayForecast(data),
  })
  public set dayForecast(data: Array<DayForecast>) {
    this._dayForecast = data;
    this.selectedCardIndex = 0;
  }

  public get dayForecast(): Array<DayForecast> {
    return this._dayForecast;
  }

  public selectedCardIndex = 0;

  @Input({ required: true })
  public unit: UNITS;

  @Output() public selectDay = new EventEmitter<string>();

  public onSelectDay(date: string, i: number): void {
    this.selectDay.emit(date);
    this.selectedCardIndex = i;
  }

  public trackBy(_: number, item: DayForecast): string {
    return item.date;
  }
}
