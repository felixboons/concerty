import {Component, Input, OnInit} from '@angular/core';
import {Ticket} from '../../../_models/ticket.model';
import {Venue} from '../../../_enums/venue.enum';

@Component({
  selector: 'app-ticket-thumbnail',
  templateUrl: './ticket-thumbnail.component.html',
  styleUrls: ['./ticket-thumbnail.component.scss']
})
export class TicketThumbnailComponent implements OnInit {
  @Input() ticket: Ticket;
  Venue = Venue;

  constructor() {
  }

  ngOnInit() {
  }
}
