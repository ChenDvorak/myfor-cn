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
        if (environment.host.endsWith('/') && value.startsWith('/')) {
            return environment.host.substring(0, environment.host.length - 1) + value;
        }
        if (!environment.host.endsWith('/') && !value.startsWith('/')) {
            return environment.host + `/${value}`;
        }
        return environment.host + value;
  }
}
