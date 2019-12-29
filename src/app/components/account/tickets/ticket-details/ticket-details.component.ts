import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../../../_models/ticket.model';
import {UserService} from '../../../../_services/user.service';
import {Venue} from '../../../../_enums/venue.enum';
import {TicketType} from '../../../../_enums/ticket-type.enum';
import {TicketItem} from '../../../../_models/ticket-item.model';
import {AuthService} from '../../../../_services/auth.service';
import {User} from '../../../../_models/user.model';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  TicketType = TicketType;
  Venue = Venue;
  ticket: Ticket;
  items: TicketItem[];
  currentUser: User;
  ticketId: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.ticketId = params.id;
      });
    this.authService.isAuthenticatedSubject
      .subscribe(user => {
        this.currentUser = user;
        this.ticket = this.getTicket(this.ticketId);
        this.items = this.getTicketItems(this.ticket);
      })
  }

  getTicketItems(ticket: Ticket): TicketItem[] {
    if (this.ticket) {
      return this.ticket.items.filter(value => {
        return value.amount > 0;
      });
    }
  }

  getTicket(ticketId: string): Ticket {
    if (this.currentUser) {
      for (const ticket of this.currentUser.tickets) {
        if (ticket._id === ticketId) {
          return ticket;
        }
      }
    }
    return null;
  }
}
