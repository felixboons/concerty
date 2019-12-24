import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {NotificationService} from '../../../../_services/notification.service';
import {TicketType} from '../../../../_enums/ticket-type.enum';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {
  TicketType = TicketType;
  ticketTypes = TicketType.keys();
  @Input() concert: Concert;
  ticketAmounts = {};
  totalTicketPrice = 0;

  constructor(private notifier: NotificationService) {
  }

  ngOnInit() {
    for (const type of this.ticketTypes) {
      this.ticketAmounts[type] = 0;
    }
  }

  buyTicket(): void {
    const ticketAmount = this.getTotalTicketAmount();
    const message = 'Successfully purchased ticket(s)';
    this.notifier.showSuccessNotification(message, this.concert._id);
  }

  updateTickets(): void {
    this.setTotalPrice();
  }

  getTicketPrice(ticketType: TicketType, concertPrice: number): number {
    return TicketType.getPrice(ticketType, concertPrice);
  }

  private setTotalPrice(): void {
    this.totalTicketPrice = 0;

    for (const type in this.ticketAmounts) {
      const ticketPrice = this.getTicketPrice(TicketType[type], this.concert.price);
      const amount = this.ticketAmounts[type];
      this.totalTicketPrice += amount * ticketPrice;
    }
  }

  private getTotalTicketAmount() {
    for (const ticketAmount in this.ticketAmounts) {
      this.totalTicketPrice += +ticketAmount
    }
  }
}
