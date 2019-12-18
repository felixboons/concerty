import {Artist} from './artist.model';

export class Concert {
  id: string;
  title: string;
  venue: string;
  date: Date;
  price: number;
  ticketsTotal: number;
  ticketsRemaining: number;
  artists: Artist[];

  constructor(id: string, title: string, venue: string, date: Date, price: number,
              ticketsTotal: number, ticketsRemaining: number, artists: Artist[]) {
    this.id = id;
    this.title = title;
    this.venue = venue;
    this.date = date;
    this.price = price;
    this.ticketsTotal = ticketsTotal;
    this.ticketsRemaining = ticketsRemaining;
    this.artists = artists;
  }
}
