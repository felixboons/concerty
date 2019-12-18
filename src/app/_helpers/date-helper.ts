import * as moment from 'moment';

export class DateHelper {

  getPrettyDate(date: Date): string {
    return moment(date).format('LL');
  }
}
