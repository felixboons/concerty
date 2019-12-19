import { Component, OnInit } from '@angular/core';
import {Concert} from '../../_models/concert.mode';
import {ConcertService} from '../../_services/concert.service';
import {Venue} from '../../_enums/venue.enum';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [];

  Venue = Venue;
  venues = Venue.keys();

  constructor(private concertService: ConcertService) { }

  ngOnInit() {
    this.concertService.concertsSubject
      .subscribe(concerts => this.concerts = concerts);
  }


}
