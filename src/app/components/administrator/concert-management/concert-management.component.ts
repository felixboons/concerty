import {Component, OnInit} from '@angular/core';
import {Concert} from '../../../_models/concert.model';
import {ConcertService} from '../../../_services/concert.service';

@Component({
  selector: 'app-concert-management',
  templateUrl: './concert-management.component.html',
  styleUrls: ['./concert-management.component.scss']
})
export class ConcertManagementComponent implements OnInit {
  concerts: Concert[] = [];
  selectedConcert: Concert = null;
  selectedConcertIndex: number = null;

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
    this.concertService.concertsSubject
      .subscribe(concerts => this.concerts = concerts);
  }

  concertSelected(concert: Concert): void {
    this.selectedConcert = concert;
    this.selectedConcertIndex = this.concerts.indexOf(this.selectedConcert);
  }

  editConcertCanceled(): void {
    this.selectedConcert = null;
  }
}
