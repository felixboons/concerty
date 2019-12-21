import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {CurrencyHelper} from '../../../../_helpers/currency-helper';
import {NotificationService} from '../../../../_services/notification.service';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {
  @Input() concert: Concert;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  }

  buyTicket(): void {
    const successMessage = 'Ticket(s) successfully purchased';
    this.notificationService.showSuccessNotification(successMessage, this.concert._id);
  }

  getPrettyPrice(price: number): string {
    return new CurrencyHelper().getPrettyPrice(price);
  }
}
