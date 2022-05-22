import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDate'
})
export class CustomeDate implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return moment(value).format('DD/MM/YYYY')
  }
}
