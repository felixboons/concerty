import {Concert} from './concert.model';
import {TicketItem} from './ticket-item.model';

export class Ticket {

  private readonly _customerName: string;
  private readonly _items: TicketItem[];
  private readonly _concert: Concert;

  constructor(customerName: string, items: TicketItem[], concert: Concert) {
    this._customerName = customerName;
    this._items = items;
    this._concert = concert;
  }

  get customerName(): string {
    return this._customerName;
  }

  get items(): TicketItem[] {
    return this._items;
  }

  get concert(): Concert {
    return this._concert;
  }
}
