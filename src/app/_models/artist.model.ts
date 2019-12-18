import {Genre} from '../_enums/genre.enum';

export class Artist {
  private id: string;
  private _name: string;
  private _biography: string;
  private _genre: Genre;
  private _imageUrl: string;

  constructor(name: string, genre: Genre, biography: string, id?: string) {
    this._name = name;
    this._biography = biography;
    this._genre = genre;
    this.id = id;
  }

  get _id(): string {
    return this.id;
  }

  get name(): string {
    return this._name;
  }

  get biography(): string {
    return this._biography;
  }

  get genre(): Genre {
    return this._genre;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }
}
