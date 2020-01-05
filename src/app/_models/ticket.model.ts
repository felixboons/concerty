import {Concert} from './concert.model';
import {TicketItem} from './ticket-item.model';

export class Ticket {

  private readonly id: string;
  private readonly _customerName: string;
  private readonly _items: TicketItem[];
  private _concert: Concert;

  constructor(customerName: string, items: TicketItem[], concert: Concert) {
    this._customerName = customerName;
    this._items = items;
    this._concert = concert;
  }

  public static getTotalTickets(items: TicketItem[]): number {
    let ticketAmount = 0;

    for (const item of items) {
      ticketAmount += item.amount;
    }
    return ticketAmount;
  }

  get _id(): string {
    return this.id;
  }

  get customerName(): string {
    return this._customerName;
  }

  get items(): TicketItem[] {
    return this._items;
  }

  set concert(value: Concert) {
    this._concert = value;
  }

  get concert(): Concert {
    return this._concert;
  }
}
