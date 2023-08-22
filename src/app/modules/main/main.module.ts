import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent, SearchComponent } from './components';
import { InputModule } from '@shared/input';
import { ForecastModule } from '@modules/forecast';
import { DirectiveModule } from '@core/directives';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputModule,
    MatIconModule,
    ForecastModule,
    DirectiveModule,
  ],
  declarations: [MainComponent, SearchComponent],
  exports: [MainComponent],
})
export class MainModule {}
