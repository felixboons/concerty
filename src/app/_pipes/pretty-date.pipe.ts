import { Pipe, PipeTransform } from '@angular/core';
import {DateHelper} from '../_helpers/date-helper';

@Pipe({
  name: 'prettyDate'
})
export class PrettyDatePipe implements PipeTransform {

  transform(date: Date, ...args: any[]): string {
    return new DateHelper().getPrettyDate(date);
  }

}
