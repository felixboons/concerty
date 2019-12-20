import * as moment from 'moment';

export class DateHelper {
  private readonly recentlyAddedThreshold = 5;

  getPrettyDate(date: Date): string {
    return moment(date).format('LL');
  }

  getMinutesRemaining(date: Date): number {
    return moment(date).diff(moment(), 'minutes');
  }

  toDays(minutes: number): number {
    return minutes / (60 * 24)
  }

  isUpcoming(date: Date): boolean {
    return moment().isSameOrBefore(date);
  }

  isRecentlyAdded(date: Date): boolean {
    const diff = moment().diff(date, 'days');
    return diff < this.recentlyAddedThreshold;
  }
}
