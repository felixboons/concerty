import {Artist} from './artist.model';
import {Venue} from '../_enums/venue.enum';

export class Concert {
  private readonly id: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _title: string;
  private readonly _venue: Venue;
  private readonly _date: Date;
  private readonly _ticketsTotal: number;
  private readonly _price: number;
  private readonly _description: string;
  private readonly _ticketsRemaining: number;
  private _artists: Artist[];

  constructor(title: string, venue: Venue, date: Date, price: number, ticketsTotal: number,
              description: string, artists: Artist[], _id?: string, ticketsRemaining?: number) {
    this._title = title;
    this._venue = venue;
    this._date = date;
    this._ticketsTotal = ticketsTotal;
    this._price = price;
    this._description = description;
    this._artists = artists;
    this.id = _id;
    this._ticketsRemaining = ticketsRemaining;
  }

  public static sortByLastUpdated(concerts: Concert[]) {
    return concerts.sort((a, b) => {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    })
  }

  public static sortByDate(concerts: Concert[]): Concert[] {
    return concerts.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
  }

  public static getArtistIds(artists: Artist[]): string[] {
    let artistIds: string[] = [];
    for (const artist of artists) {
      artistIds.push(artist._id);
    }
    return artistIds;
  }

  public static getEmbeddedArtists(concert: Concert, allArtists: Artist[]): Artist[] {
    const artists: Artist[] = [];

    for (const _artist of concert.artists) {
      const artistId = _artist.toString(); // Artist actually is an ID. Fool TS with .toString().

      for (const artist of allArtists) {
        if (artistId === artist._id) {
          artists.push(artist);
        }
      }
    }
    return artists;
  }

  get title(): string {
    return this._title;
  }

  get venue(): Venue {
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

  set artists(value: Artist[]) {
    this._artists = value;
  }

  get artists(): Artist[] {
    return this._artists;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
