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

  getDaysRemaining(date: Date): number {
    return new DateHelper().getDaysRemaining(date);
  }
}
