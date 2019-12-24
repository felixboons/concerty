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
  @Input() concert: Concert;
  TicketType = TicketType;
  ticketTypes = TicketType.keys();
  ticketAmounts = {};
  totalTicketPrice = 0;

  // Ticket type with respective name and price would be saved in a concert instead.

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

  updateTickets(data): void {
    // TODO: Only set price when data changed from previous data. NO DOUBLES.
    console.log(data);
    this.setTotalPrice();
  }

  getTicketPrice(ticketType: TicketType, concertPrice: number): number {
    return TicketType.getPrice(ticketType, concertPrice);
  }

  private setTotalPrice(): void {
    for (const type in this.ticketAmounts) {
      const ticketPrice = this.getTicketPrice(TicketType[type], this.concert.price);
      const amount = this.ticketAmounts[type];
      this.totalTicketPrice += amount * ticketPrice;
    }
  }

  private getTotalTicketAmount() {
    for (const ticketAmount in this.ticketAmounts) {
      console.log(ticketAmount);
      this.totalTicketPrice += +ticketAmount
    }
  }
}
