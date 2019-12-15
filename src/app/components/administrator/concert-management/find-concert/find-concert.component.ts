import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-concert',
  templateUrl: './find-concert.component.html',
  styleUrls: ['./find-concert.component.scss']
})
export class FindConcertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  removeConcert(index: number): boolean {
    return null;
  }
}
