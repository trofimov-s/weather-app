import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { RootApi } from './root-api';
import { UserLocationData, UserLocationApiResponse } from '@core/model/api';

@Injectable({ providedIn: 'root' })
export class UserLocationService extends RootApi {
  private _userLocation$ = new BehaviorSubject<UserLocationData>(null);

  public get userLocation$(): Observable<UserLocationData> {
    return this._userLocation$.asObservable();
  }

  constructor(http: HttpClient) {
    super(http);
  }

  public trackUserLocation(): Observable<UserLocationData> {
    return this.http.get(this.buildUrl((u) => u.userLocationApiUrl, {}, false)).pipe(
      map(
        ({ location: { city, country } }: UserLocationApiResponse): UserLocationData => ({
          city,
          country: country?.name,
          country_iso_code: country?.code,
          flag_emoji: country?.flag?.emoji,
          flag_svg: country?.flag?.twemoji,
          city_with_code: `${city},${country?.code}`,
        }),
      ),
      tap((data: UserLocationData) => this._userLocation$.next(data)),
      catchError(() => {
        this._userLocation$.next(null);
        return of(null);
      }),
    );
  }
}
