import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserLocationData } from '@core/model/api';
import { UserLocationService } from '@core/service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLocationComponent implements OnInit {
  public userLocation$: Observable<UserLocationData>;

  constructor(private userLocationService: UserLocationService) {}

  public ngOnInit(): void {
    this.userLocation$ = this.userLocationService.userLocation$;
  }
}
