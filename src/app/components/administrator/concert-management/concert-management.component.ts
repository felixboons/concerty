import {Component, OnInit} from '@angular/core';
import {Concert} from '../../../_models/concert.mode';
import {ConcertService} from '../../../_services/concert.service';

@Component({
  selector: 'app-concert-management',
  templateUrl: './concert-management.component.html',
  styleUrls: ['./concert-management.component.scss']
})
export class ConcertManagementComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) {
  }

  ngOnInit() {
    this.concertService.concertsSubject.subscribe(concerts => this.concerts = concerts);
  }
}
