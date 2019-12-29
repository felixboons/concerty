import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../_models/ticket.model';
import {AuthService} from '../../../_services/auth.service';
import {TicketItem} from '../../../_models/ticket-item.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject
      .subscribe(user => {
        if (user) {
          this.tickets = user.tickets.reverse();
        }
      });
  }

  getTotalTickets(items: TicketItem[]): number {
    return Ticket.getTotalTickets(items);
  }
}
