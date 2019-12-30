import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {DateHelper} from '../../../../_helpers/date-helper';
import {ConcertService} from '../../../../_services/concert.service';
import {Venue} from '../../../../_enums/venue.enum';
import * as $ from 'jquery';
import {SearchHelper} from '../../../../_helpers/search-helper';

@Component({
  selector: 'app-find-concert',
  templateUrl: './find-concert.component.html',
  styleUrls: ['./find-concert.component.scss']
})
export class FindConcertComponent implements OnInit {
  @Output() concertSelected = new EventEmitter<Concert>();
  @Input() concerts: Concert[] = [];
  concertsCopy: Concert[] = [];
  Venue = Venue;
  input: string;

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
  }

  removeConcert(id: string, index: number): void {
    this.concertService.deleteConcert(id, index);
  }

  selectConcert(concert: Concert): void {
    this.concertSelected.emit(concert);
    $('.uk-close').click();
  }

  search(): void {
    if (this.concertsCopy.length === 0) {
      this.concertsCopy = this.concerts;
    }

    this.concerts = SearchHelper.searchConcerts(this.input, this.concertsCopy);
  }
}
