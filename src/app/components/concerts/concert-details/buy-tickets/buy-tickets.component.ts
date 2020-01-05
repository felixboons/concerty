import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {NotificationService} from '../../../../_services/notification.service';
import {TicketType} from '../../../../_enums/ticket-type.enum';
import {TicketService} from '../../../../_services/ticket.service';
import {TicketItem} from '../../../../_models/ticket-item.model';
import {AuthService} from '../../../../_services/auth.service';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {
  TicketType = TicketType;
  ticketTypes = TicketType.keys();
  @Input() concert: Concert;
  items: TicketItem[] = [];
  totalTicketPrice = 0;
  isAuthenticated = false;

  constructor(private authService: AuthService,
              private ticketService: TicketService,
              private notifier: NotificationService) {
  }

  ngOnInit() {
    this.initializeTickets();
    this.authService.isAuthenticated()
      .then(_ => this.isAuthenticated = true);
  }

  buyTicket(): void {
    this.ticketService.buyTicket(this.items, this.concert._id)
      .then(user => {
        const message = 'Successfully purchased ticket(s)';
        this.notifier.showSuccessNotification(message, this.concert._id);
      })
      .catch(_ => {
        this.notifier.showErrorNotification('Failed to buy ticket(s). There are not this many tickets left.');
      })
      .finally(() => this.resetTicketValues());
  }

  updateTickets(): void {
    this.setTotalPrice();
  }

  getTicketType(type: string): TicketType {
    return TicketType[type];
  }

  getTicketPrice(ticketType: TicketType, concertPrice: number): number {
    return TicketType.getPrice(ticketType, concertPrice);
  }

  private setTotalPrice(): void {
    this.totalTicketPrice = 0;

    for (const item of this.items) {
      this.totalTicketPrice += (item.amount * item.price);
    }
  }

  private getTotalTicketAmount() {
    for (const ticketAmount in this.items) {
      this.totalTicketPrice += +ticketAmount;
    }
  }

  private initializeTickets() {
    this.items = [];
    for (const type of this.ticketTypes) {
      const item = new TicketItem(type, this.getTicketPrice(TicketType[type], this.concert.price), 0);
      this.items.push(item);
    }
  }

  private resetTicketValues() {
    this.totalTicketPrice = 0;
    this.initializeTickets();
  }
}
