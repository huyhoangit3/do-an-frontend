import { Pipe, PipeTransform } from '@angular/core';
import { API } from 'src/app/apiURL';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `${API.FILE}/${value}`
  }
}
