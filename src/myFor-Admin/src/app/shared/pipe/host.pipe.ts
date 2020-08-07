import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
/*

 * Usage:
 *   api | host
 * Example:
 *   {{ api/ | host }}
 *   formats to: 2k
*/
@Pipe({name: 'host'})
export class HostPipe implements PipeTransform {
  transform(value: string): string {
        if (!value.startsWith('/api')) {
          return value;
        }
        if (environment.SERVER_URL.endsWith('/') && value.startsWith('/')) {
            return environment.SERVER_URL.substring(0, environment.SERVER_URL.length - 1) + value;
        }
        if (!environment.SERVER_URL.endsWith('/') && !value.startsWith('/')) {
            return environment.SERVER_URL + `/${value}`;
        }
        return environment.SERVER_URL + value;
  }
}
