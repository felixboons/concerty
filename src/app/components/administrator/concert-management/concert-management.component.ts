import { Component, OnInit } from '@angular/core';
import {Concert} from '../../../_models/concert.mode';

@Component({
  selector: 'app-concert-management',
  templateUrl: './concert-management.component.html',
  styleUrls: ['./concert-management.component.scss']
})
export class ConcertManagementComponent implements OnInit {
  concerts: Concert[] = [null, null, null, null, null];

  constructor() { }

  ngOnInit() {
  }

  removeConcert(index: number): boolean {
    return null;
  }
}
