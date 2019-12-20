import {Component, Input, OnInit} from '@angular/core';
import {Concert} from '../../../../_models/concert.model';
import {CurrencyHelper} from '../../../../_helpers/currency-helper';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {
  @Input() concert: Concert;

  constructor() { }

  ngOnInit() {
    console.log(this.concert);
  }

  buyTicket(): void {

  }

  getPrettyPrice(price: number): string {
    return new CurrencyHelper().getPrettyPrice(price);
  }
}
