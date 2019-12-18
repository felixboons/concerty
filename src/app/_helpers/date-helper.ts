import * as moment from 'moment';

export class DateHelper {

  constructor() {
    // moment().locale('NL');
  }

  getPrettyDate(date: Date): string {
    console.log(date);
    return moment(date).format('LL');
  }
}
