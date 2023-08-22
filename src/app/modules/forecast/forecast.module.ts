import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExpansionPanelModule } from '@shared/expansion-panel';

import {
  ForecastComponent,
  ForecastPreviewComponent,
  ForecastDetailsComponent,
  ForecastCardsComponent,
  ForecastPreviewTabsComponent,
  ForecastUnitsComponent,
  FavoriteForecastComponent,
} from './components';
import { ForecastApiService, ForecastHelperService } from './service';
import { DataListModule } from '@shared/data-list';
import { DirectiveModule } from '@core/directives';
import { MatIconModule } from '@angular/material/icon';
import { UnitConvertPipe } from '@core/pipes';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    DataListModule,
    DirectiveModule,
    MatProgressSpinnerModule,
    ExpansionPanelModule,
    MatIconModule,
  ],
  declarations: [
    ForecastComponent,
    ForecastPreviewComponent,
    ForecastDetailsComponent,
    ForecastCardsComponent,
    ForecastPreviewTabsComponent,
    ForecastUnitsComponent,
    FavoriteForecastComponent,
    UnitConvertPipe,
  ],
  exports: [ForecastComponent],
  providers: [ForecastApiService, ForecastHelperService],
})
export class ForecastModule {}
