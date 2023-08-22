import { UNITS } from '@modules/forecast';

export interface Query {
  q?: string;
  cnt?: number;
  appId?: string;
  units?: UNITS;
}
