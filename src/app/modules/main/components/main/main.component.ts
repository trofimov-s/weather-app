import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForecastHelperService } from '@modules/forecast';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  constructor(private forecastHelper: ForecastHelperService) {}

  public updateCity(city: string): void {
    this.forecastHelper.city = city;
  }
}
