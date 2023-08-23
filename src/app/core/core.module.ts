import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HeaderModule } from '@modules/header';
import { UserLocationService } from './service';
import { UserLocationData } from './models/api';
import { firstValueFrom } from 'rxjs';
import { FooterModule } from '@modules/footer';

function init(locationService: UserLocationService): () => Promise<UserLocationData> {
  return () => firstValueFrom(locationService.trackUserLocation());
}

@NgModule({
  imports: [CommonModule, HeaderModule, FooterModule],
  exports: [HeaderModule, FooterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: init,
      deps: [UserLocationService],
    },
  ],
})
export class CoreModule {}
