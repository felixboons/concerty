import {Artist} from './artist.model';

export class Concert {
  private id: string;
  private _title: string;
  private _venue: string;
  private _date: Date;
  private _ticketsTotal: number;
  private _price: number;
  private _description: string;
  private _ticketsRemaining: number;
  private _artists: Artist[];

  constructor(title: string, venue: string, price: number, ticketsTotal: number, description: string,
              id?: string, ticketsRemaining?: number, date?: Date, artists?: Artist[]) {
    this._title = title;
    this._venue = venue;
    this._date = date;
    this._ticketsTotal = ticketsTotal;
    this._price = price;
    this._description = description;
    this.id = id;
    this._ticketsRemaining = ticketsRemaining;
    this._artists = artists;
  }

  get title(): string {
    return this._title;
  }

  get venue(): string {
    return this._venue;
  }

  get price(): number {
    return this._price;
  }

  get ticketsTotal(): number {
    return this._ticketsTotal;
  }

  get date(): Date {
    return this._date;
  }

  get description(): string {
    return this._description;
  }

  get _id(): string {
    return this.id;
  }

  get ticketsRemaining(): number {
    return this._ticketsRemaining;
  }

  get artists(): Artist[] {
    return this._artists;
  }
}
