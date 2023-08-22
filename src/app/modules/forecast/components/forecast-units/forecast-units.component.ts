import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ForecastHelperService } from '../../service';
import { SubscriptionDetacher } from '@core/utils';
import { unitsMap } from '@core/constant/units';
import { UNITS } from '@modules/forecast';

@Component({
  selector: 'app-forecast-units',
  templateUrl: './forecast-units.component.html',
  styleUrls: ['./forecast-units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastUnitsComponent implements OnInit, OnDestroy {
  private detacher = new SubscriptionDetacher();
  public currentUnit: UNITS;
  public readonly unitsMap = Object.entries(unitsMap) as [UNITS, string][];

  constructor(private forecastHelper: ForecastHelperService) {}

  public ngOnInit(): void {
    this.forecastHelper.unit$
      .pipe(this.detacher.takeUntilDetach())
      .subscribe((unit) => (this.currentUnit = unit));
  }

  public ngOnDestroy(): void {
    this.detacher.detach();
  }

  public selectUnit(unit: UNITS): void {
    if (unit !== this.currentUnit) {
      this.forecastHelper.unit$ = unit;
    }
  }
}
