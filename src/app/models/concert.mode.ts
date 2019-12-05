import {Artist} from './artist.model';

export class Concert {
  title: string;
  venue: string;
  date: Date;
  price: number;
  ticketsTotal: number;
  ticketsRemaining: number;
  artists: Artist[];

  constructor(title: string, venue: string, date: Date, price: number, ticketsTotal: number, ticketsRemaining: number, artists: Artist[]) {
    this.title = title;
    this.venue = venue;
    this.date = date;
    this.price = price;
    this.ticketsTotal = ticketsTotal;
    this.ticketsRemaining = ticketsRemaining;
    this.artists = artists;
  }
}
