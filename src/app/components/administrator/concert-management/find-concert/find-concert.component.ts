import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {DateHelper} from '../../../../_helpers/date-helper';
import {ConcertService} from '../../../../_services/concert.service';
import {Venue} from '../../../../_enums/venue.enum';
import * as $ from 'jquery';
import {SearchHelper} from '../../../../_helpers/searchHelper';

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

  constructor(private concertService: ConcertService) { }

  ngOnInit() { }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  getPrettyDate(date: Date): string {
    return new DateHelper().getPrettyDate(date);
  }

  removeConcert(_id: string): void {
    this.concertService.deleteConcert(_id);
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
