import { Dictionary } from '@core/model/shared';

type KeyString<T, K extends keyof T> = T[K] extends string ? string : string;

export function toDictionary<T>(
  data: T[],
  selectorFn: (item: T) => KeyString<T, keyof T>,
  valueHandler?: (v: KeyString<T, keyof T>) => string,
): Dictionary<Array<T>> {
  const result: Dictionary<Array<T>> = {};
  data.forEach((item) => {
    const value = valueHandler ? valueHandler(selectorFn(item)) : selectorFn(item);

    if (value in result) {
      result[value].push(item);
    } else {
      result[value] = [item];
    }
  });

  return result;
}
