import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { forecastFullViewDetails } from '@core/constant/options';
import { Weather } from '@core/model/forecast';
import { DataListOption } from '@core/model/shared';
import { mapToDataListOption } from '@core/utils';
import { UNITS } from '../../enum';

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastDetailsComponent {
  @Input({
    alias: 'forecast',
    required: true,
    transform: (forecast: Weather) =>
      mapToDataListOption<Weather>(forecastFullViewDetails, forecast),
  })
  public forecastDetailsOptions: DataListOption<Weather>[];

  @Input()
  public unit: UNITS;
}
