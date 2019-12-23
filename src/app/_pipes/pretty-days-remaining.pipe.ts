import { Pipe, PipeTransform } from '@angular/core';
import {DateHelper} from '../_helpers/date-helper';

@Pipe({
  name: 'prettyDaysRemaining'
})
export class PrettyDaysRemainingPipe implements PipeTransform {

  transform(date: Date, ...args: any[]): string {
    return DateHelper.getPrettyDaysRemaining(date);
  }
}
