import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../_models/concert.mode';
import {DateHelper} from '../../../_helpers/date-helper';

@Component({
  selector: 'app-concert-thumbnail',
  templateUrl: './concert-thumbnail.component.html',
  styleUrls: ['./concert-thumbnail.component.scss']
})
export class ConcertThumbnailComponent implements OnInit {
  @Input() concert: Concert;

  constructor() { }

  ngOnInit() {
  }

  getPrettyDate(date: Date): string {
    return new DateHelper().getPrettyDate(date);
  }

  getDaysRemaining(date: Date): string {
    const concertDuration = 180; // In minutes. (Should be pulled from concert data.)
    const dateHelper = new DateHelper();
    const minutesRemaining = dateHelper.getMinutesRemaining(date);
    const daysRemaining = Math.round(dateHelper.toDays(minutesRemaining));

    console.log(minutesRemaining);

    switch(true) {
      case (minutesRemaining + concertDuration < 0): return 'ENDED';
      case (minutesRemaining < 0): return 'HAPPENING';
      case (daysRemaining === 0): return 'TOMORROW';
      default: return `IN ${daysRemaining} DAYS`;
    }
  }
}
