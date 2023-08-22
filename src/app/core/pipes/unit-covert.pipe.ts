import { Pipe, PipeTransform } from '@angular/core';
import { UNITS } from '@modules/forecast';
import { unitsMap } from '../constant/forecast/units-map';

@Pipe({
  name: 'unit',
})
export class UnitConvertPipe implements PipeTransform {
  public transform(value: UNITS): string {
    return unitsMap[value];
  }
}
