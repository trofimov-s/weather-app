import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '@shared/icon';

import { HeaderComponent, UserLocationComponent } from './components';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [HeaderComponent, UserLocationComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
