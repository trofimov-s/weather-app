import { HttpClient } from '@angular/common/http';

import { ApiConfig, Query } from '@core/model/api';
import { API_CONFIG, appId } from '@core/constant/api';

export abstract class RootApi {
  constructor(protected http: HttpClient) {}

  protected buildUrl(
    baseUrlSelector: (u: ApiConfig) => string,
    query: Query = {},
    withAppId = true,
  ): string {
    const updatedQueries: Query = withAppId ? { ...query, appId } : query;

    return this.buildPath(baseUrlSelector, updatedQueries);
  }

  private buildPath(baseUrlSelector: (u: ApiConfig) => string, query?: Query): string {
    const baseUrl = baseUrlSelector(API_CONFIG);
    const queries = this.buildQueryParams(query);
    const fullUrl = queries ? `${baseUrl}?${queries}` : baseUrl;

    return fullUrl;
  }

  private buildQueryParams(query: Query): string {
    return encodeURI(
      Object.entries(query)
        .map((i) => i.join('='))
        .join('&'),
    );
  }
}
