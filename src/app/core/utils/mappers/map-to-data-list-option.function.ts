import { DataListOption } from '@core/model/shared';

export function mapToDataListOption<T>(options: DataListOption<T>[], data: T): DataListOption[] {
  return options.map(({ key, ...rest }): DataListOption<T> => ({ ...rest, value: data[key] }));
}
