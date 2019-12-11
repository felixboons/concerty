import {Artist} from './artist.model';
import {Model} from './model.abstract-model';

export class Concert extends Model {
  title: string;
  venue: string;
  date: Date;
  price: number;
  ticketsTotal: number;
  ticketsRemaining: number;
  artists: Artist[];

  constructor(title: string, venue: string, date: Date, price: number,
              ticketsTotal: number, ticketsRemaining: number, artists: Artist[], model: Model) {
    super(model.getVersion(), model.getCreatedAt(), model.getUpdatedAt());
    this.title = title;
    this.venue = venue;
    this.date = date;
    this.price = price;
    this.ticketsTotal = ticketsTotal;
    this.ticketsRemaining = ticketsRemaining;
    this.artists = artists;
  }
}
