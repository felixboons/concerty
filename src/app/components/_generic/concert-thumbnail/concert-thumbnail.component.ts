import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../_models/concert.model';
import {Venue} from '../../../_enums/venue.enum';

@Component({
  selector: 'app-concert-thumbnail',
  templateUrl: './concert-thumbnail.component.html',
  styleUrls: ['./concert-thumbnail.component.scss']
})
export class ConcertThumbnailComponent implements OnInit {
  @Input() concert: Concert;
  Venue = Venue;

  constructor() {
  }

  ngOnInit() {
  }
}
