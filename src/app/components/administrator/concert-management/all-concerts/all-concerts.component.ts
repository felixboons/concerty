import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {ConcertService} from '../../../../_services/concert.service';
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

  removeConcert(id: string, index: number): void {
    this.concertService.deleteConcert(id, index);
  }

  selectConcert(concert: Concert): void {
    this.concertSelected.emit(concert);
  }
}
