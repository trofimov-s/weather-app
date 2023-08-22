import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataListComponent } from './data-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DataListComponent],
  exports: [DataListComponent],
})
export class DataListModule {}
