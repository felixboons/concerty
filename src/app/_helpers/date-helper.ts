import * as moment from 'moment';

export class DateHelper {
  private readonly recentlyAddedThreshold = 5;

  getPrettyDate(date: Date): string {
    return moment(date).format('LL');
  }

  getDaysRemaining(date: Date): number {
    return moment(date).diff(moment(), 'days') + 1;
  }

  isUpcoming(date: Date): boolean {
    return moment().isSameOrBefore(date);
  }

  isRecentlyAdded(date: Date): boolean {
    const diff = moment().diff(date, 'days');
    return diff < this.recentlyAddedThreshold;
  }
}
