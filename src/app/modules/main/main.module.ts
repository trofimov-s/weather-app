import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainComponent } from './components';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
