import {Component, OnInit} from '@angular/core';
import {Concert} from '../../_models/concert.model';
import {ConcertService} from '../../_services/concert.service';
import {DateHelper} from '../../_helpers/date-helper';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [];
  recentlyAddedConcerts: Concert[] = [];

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
    this.concertService.concertsSubject
      .subscribe(concerts => {
        this.concerts = concerts;
        if (concerts) {
          this.initializeRecentlyAddedConcerts();
        }
      });
  }

  private initializeRecentlyAddedConcerts() {
    for (const concert of this.concerts) {
      if (DateHelper.isUpcoming(concert.date) &&
        DateHelper.isRecentlyAdded(concert.createdAt)) {
        this.recentlyAddedConcerts.push(concert);
      }
    }
  }
}
