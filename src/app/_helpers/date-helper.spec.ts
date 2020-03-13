import * as moment from 'moment';
import {DateHelper} from './date-helper';

describe('DateHelper helper functions', () => {

  it('is able to detect upcoming dates', () => {
    const todayPlusOneMillisecond = moment().add(1, 'ms').toDate();
    const todayMinusOneMillisecond = moment().subtract(1, 'ms').toDate();

    expect(DateHelper.isUpcoming(todayPlusOneMillisecond)).toBeTruthy();
    expect(DateHelper.isUpcoming(todayMinusOneMillisecond)).toBeFalsy();
  });
});
