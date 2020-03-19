import * as moment from 'moment';
import {DateHelper} from './date-helper';

describe('DateHelper', () => {

  it('can detect upcoming dates', () => {
    const todayPlusOneMillisecond = moment().add(1, 'ms').toDate();
    const todayMinusOneMillisecond = moment().subtract(1, 'ms').toDate();

    const isUpcoming = DateHelper.isUpcoming(todayPlusOneMillisecond);
    const isUpcoming2 = DateHelper.isUpcoming(todayMinusOneMillisecond);

    expect(isUpcoming).toBeTruthy();
    expect(isUpcoming2).toBeFalsy();
  });

  it('can detect recently added dates', () => {
    const aWeekAgo = moment()
      .subtract(7, 'days')
      .add(1, 'hours').toDate();
    const aWeekAgoPlusOneMillisecond = moment()
      .subtract(7, 'days').toDate();

    const isRecentlyAdded = DateHelper.isRecentlyAdded(aWeekAgo, 7);
    const isRecentlyAdded2 = DateHelper.isRecentlyAdded(aWeekAgoPlusOneMillisecond, 7);

    expect(isRecentlyAdded).toBeTruthy();
    expect(isRecentlyAdded2).toBeFalsy();
  });

  it('can display date in a readable format', () => {
    const today = moment("1970-01-01").toDate();
    const todayPretty = DateHelper.getPrettyDate(today);

    expect(todayPretty).toEqual("1 januari 1970");
  })

});
