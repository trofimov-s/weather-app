export interface DataListOption<T = any> {
  title: string;
  key?: keyof T;
  value?: T[keyof T];
  type?: 'units';
}
