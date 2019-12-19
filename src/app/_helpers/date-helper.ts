import * as moment from 'moment';

export class DateHelper {

  getPrettyDate(date: Date): string {
    return moment(date).format('LL');
  }

  getDaysRemaining(date: Date): number {
    return moment().diff(date, 'days');
  }

  isUpcoming(date: Date): boolean {
    return moment().isSameOrBefore(date);
  }
}
