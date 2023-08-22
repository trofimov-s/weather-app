import { UNITS } from '@modules/forecast';

export const unitsMap: {
  [key in UNITS]: string;
} = {
  [UNITS.STANDARD]: 'F',
  [UNITS.METRIC]: 'C',
};
