import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { API } from 'src/app/apiURL';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'customDate'
})
export class CustomeDate implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    const dateTime = moment(value).toISOString()
    return moment(dateTime).utc().format('DD/MM/YYYY HH:mm:ss')
  }
}
