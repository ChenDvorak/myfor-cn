import { Pipe, PipeTransform } from '@angular/core';
/*

 * Usage:
 *   value | kilo:exponent
 * Example:
 *   {{ 2000 | kilo:10 }}
 *   formats to: 2k
*/
@Pipe({name: 'kilo'})
export class KiloPipe implements PipeTransform {
  transform(value: number): string {
    if (value && value.toString().length >= 4) {
        const source = value.toString();
        return source.substring(0, source.length - 3) + 'k';
    }
    return value.toString();
  }
}
