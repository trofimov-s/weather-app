import { Injectable } from '@angular/core';
import { LocalStorageHandlerService, UserLocationService } from '@core/service';
import { ForecastApiService } from '../forecast-api/forecast-api.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  debounceTime,
  filter,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { WeatherData } from '@core/model/forecast';
import { Dictionary } from '@core/model/shared';
import { UNITS } from '@modules/forecast';
import { LocalStorageKeys } from '@core/enum';

type ForecastCache = Dictionary<{ [key in UNITS]?: WeatherData }>;

@Injectable()
export class ForecastHelperService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public isError$ = new BehaviorSubject<boolean>(false);
  public _cache$ = new BehaviorSubject<ForecastCache>(null);

  public get forecast$(): Observable<WeatherData> {
    return combineLatest([this.city$, this.unit$]).pipe(
      switchMap(([city, unit]) => {
        const cache = this._cache$.getValue();

        if (cache && city && city in cache && unit in cache[city]) {
          this.isError$.next(false);
          return of(cache[city][unit]);
        } else {
          return this.getForecast(city, unit).pipe(
            tap((forecast) => {
              if (forecast) {
                this.addDataToCache([forecast]);
              }
              this.isLoading$.next(false);
            }),
          );
        }
      }),
      filter(Boolean),
    );
  }

  private _unit$ = new BehaviorSubject<UNITS>(null);
  public get unit$(): Observable<UNITS> {
    return this._unit$.pipe(filter(Boolean));
  }
  public set unit$(unit: UNITS) {
    this._unit$.next(unit);
    this.localStorageHandler.setData(LocalStorageKeys.UNIT, unit);
  }

  private _city$ = new BehaviorSubject<string>(null);
  public get city$(): Observable<string> {
    return this._city$.pipe(filter(Boolean));
  }

  public set city(city: string) {
    const cityInLowerCase = city.toLowerCase();

    if (cityInLowerCase !== this._city$.getValue()) {
      this._city$.next(cityInLowerCase);
    }
  }

  private _favoriteCities$ = new BehaviorSubject<string[]>(null);
  public get favoriteCities$(): Observable<string[]> {
    return this._favoriteCities$.asObservable();
  }
  public get favoriteCitiesForecast$(): Observable<WeatherData[]> {
    return combineLatest([this._favoriteCities$, this.unit$]).pipe(
      debounceTime(200),
      switchMap(([cities, unit]) => {
        if (!cities?.length) {
          return of([]);
        }

        const cache = this._cache$.getValue();
        const cityForCache: string[] = [];
        const forecasts: Observable<WeatherData>[] = cities.map((city) => {
          if (cache && city in cache && unit in cache[city]) {
            return of(cache[city][unit]);
          } else {
            cityForCache.push(city);
            return this.getForecast(city, unit);
          }
        });

        return combineLatest(forecasts).pipe(
          tap((forecasts) => {
            const forecastsForCache: WeatherData[] = forecasts.filter(({ location }) =>
              cityForCache.includes(location.toLowerCase().split(',')[0]),
            );
            this.addDataToCache(forecastsForCache);
          }),
        );
      }),
    );
  }

  public addToFavorite(city: string): void {
    const currentFavorite = this._favoriteCities$.getValue() ?? [];

    if (!currentFavorite.includes(city)) {
      currentFavorite.push(city);
      this.localStorageHandler.setData(LocalStorageKeys.FAVORITE, JSON.stringify(currentFavorite));
      this._favoriteCities$.next(currentFavorite);
    }
  }

  public removeFromFavorite(city: string): void {
    const currentFavorite = this._favoriteCities$.getValue();

    if (currentFavorite.includes(city)) {
      const newFavorite = currentFavorite.filter((c) => c !== city);
      this.localStorageHandler.setData(LocalStorageKeys.FAVORITE, JSON.stringify(newFavorite));
      this._favoriteCities$.next(newFavorite);
    }
  }

  constructor(
    private forecastApi: ForecastApiService,
    private localStorageHandler: LocalStorageHandlerService,
    private userLocationService: UserLocationService,
  ) {}

  public init(): void {
    this.isLoading$.next(true);
    this.setUnitDefault();
    this.setFavoriteCities();

    this.userLocationService.userLocation$
      .pipe(
        take(1),
        tap((loc) => {
          if (loc) {
            this._city$.next(loc.city.toLowerCase());
          }
        }),
      )
      .subscribe({ complete: () => this.isLoading$.next(false) });
  }

  private setUnitDefault(): void {
    const unit = this.localStorageHandler.getData<UNITS>(LocalStorageKeys.UNIT);

    this.unit$ = unit ?? UNITS.STANDARD;
  }

  private setFavoriteCities(): void {
    const cities = JSON.parse(
      this.localStorageHandler.getData<string>(LocalStorageKeys.FAVORITE),
    ) as string[];

    this._favoriteCities$.next(cities);
  }

  private getForecast(city: string, unit: UNITS): Observable<WeatherData> {
    this.isError$.next(false);
    return this.forecastApi.getWeatherForecast(city, unit).pipe(
      catchError(() => {
        this.isError$.next(true);
        return of(null);
      }),
    );
  }

  private addDataToCache(forecasts: WeatherData[]): void {
    const cache = this._cache$.getValue();
    const unit = this._unit$.getValue();

    const newCache: ForecastCache = forecasts.reduce(
      (prev: ForecastCache, forecast: WeatherData) => {
        const city = forecast.location.split(',')[0].toLowerCase();
        let currentCity: ForecastCache = {
          [city]: {},
        };

        if (cache && city in cache) {
          currentCity = {
            [city]: {
              ...cache[city],
            },
          };
        }

        currentCity[city] = {
          ...currentCity[city],
          [unit]: forecast,
        };

        return { ...prev, ...currentCity };
      },
      {},
    );

    const updatedCache: ForecastCache = { ...cache, ...newCache };
    this._cache$.next(updatedCache);
  }
}
