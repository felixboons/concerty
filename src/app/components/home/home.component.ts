import { Component, OnInit } from '@angular/core';
import {Concert} from '../../_models/concert.mode';
import {ConcertService} from '../../_services/concert.service';
import {DateHelper} from '../../_helpers/date-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  concerts: Concert[] = [];
  upcomingConcerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit() {
    this.concertService.concertsSubject
      .subscribe(concerts => {
        if (concerts) {
          this.concerts = concerts;
          this.initializeUpcomingConcerts();

        }
      });
  }

  private initializeUpcomingConcerts() {
    const dateHelper = new DateHelper();

    for (const concert of this.concerts) {
      if (dateHelper.isUpcoming(concert.date)) {
        this.upcomingConcerts.push(concert);
      }
    }
  }
}
