import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: string): string {
    return Moment(value).fromNow();
  }

}
