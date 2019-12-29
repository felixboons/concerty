import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Ticket} from '../../../../_models/ticket.model';
import {UserService} from '../../../../_services/user.service';
import {Venue} from '../../../../_enums/venue.enum';
import {TicketType} from '../../../../_enums/ticket-type.enum';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;
  Venue = Venue;
  TicketType = TicketType;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const _id = params.id;
        this.ticket = this.userService.getTicket(_id);
      });
  }

}
