import { Component, OnInit } from '@angular/core';
import {Concert} from '../../../_models/concert.mode';
import {ConcertService} from '../../../_services/concert.service';

@Component({
  selector: 'app-concert-management',
  templateUrl: './concert-management.component.html',
  styleUrls: ['./concert-management.component.scss']
})
export class ConcertManagementComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) { }

  ngOnInit() {
    this.concertService.concertsSubject.subscribe(concerts => this.concerts = concerts);
  }

  removeConcert(index: number): void {
    console.log(index);
    console.log(index);
    this.concertService.deleteConcert(index);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }
}
