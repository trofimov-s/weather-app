import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent, UserLocationComponent } from './components';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [HeaderComponent, UserLocationComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
