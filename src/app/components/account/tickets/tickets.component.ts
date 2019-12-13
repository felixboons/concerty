import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [1, 1, 1, 1, 1];

  constructor() { }

  ngOnInit() {
  }

}
