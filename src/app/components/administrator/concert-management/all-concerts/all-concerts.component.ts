import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {ConcertService} from '../../../../_services/concert.service';
import {DateHelper} from '../../../../_helpers/date-helper';
import {Venue} from '../../../../_enums/venue.enum';

@Component({
  selector: 'app-all-concerts',
  templateUrl: './all-concerts.component.html',
  styleUrls: ['./all-concerts.component.scss']
})
export class AllConcertsComponent implements OnInit {
  @Output() concertSelected = new EventEmitter<Concert>();
  @Input() concerts: Concert[] = [];
  pageOfConcerts: Concert[] = [];
  Venue = Venue;

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
  }

  onChangePage(pageOfItems: Array<Concert>) {
    this.pageOfConcerts = pageOfItems;
  }

  removeConcert(_id: string): void {
    this.concertService.deleteConcert(_id);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  getPrettyDate(date: Date): string {
    return new DateHelper().getPrettyDate(date);
  }

  selectConcert(concert: Concert): void {
    this.concertSelected.emit(concert);
  }
}
