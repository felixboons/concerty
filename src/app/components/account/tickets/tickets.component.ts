import { Component, OnInit } from '@angular/core';
import {Ticket} from '../../../_models/ticket.model';
import {AuthService} from '../../../_services/auth.service';
import {TicketItem} from '../../../_models/ticket-item.model';
import {DateHelper} from '../../../_helpers/date-helper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  upcomingTickets: Ticket[] = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticatedSubject
      .subscribe(user => {
        if (user && user.tickets) {
          this.tickets = user.tickets.reverse();
          this.fillUpcomingTickets();
        }
      });
  }

  getTotalTickets(items: TicketItem[]): number {
    return Ticket.getTotalTickets(items);
  }

  fillUpcomingTickets(): void {
    for (const ticket of this.tickets) {
      if (DateHelper.isUpcoming(ticket.concert.date)) {
        this.upcomingTickets.push(ticket);
      }
    }
  }

  showTicket(_id: string) {
    this.router.navigate(['/account/tickets', _id])
  }
}
