import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Weather } from '@core/model/forecast';

@Component({
  selector: 'app-forecast-preview-tabs',
  templateUrl: './forecast-preview-tabs.component.html',
  styleUrls: ['./forecast-preview-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastPreviewTabsComponent {
  @Input() public selectedDayForecasts: Array<Weather>;
  @Input() public selectedDate: string;

  @Output() public selectDay = new EventEmitter<number>();

  public trackBy(_: number, item: Weather): string {
    return item.date;
  }
}
