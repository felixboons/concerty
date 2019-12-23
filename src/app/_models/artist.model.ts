import {Genre} from '../_enums/genre.enum';

export class Artist {
  private readonly id: string;
  private readonly _createdAt: Date;
  private readonly _name: string;
  private readonly _biography: string;
  private readonly _genre: Genre;
  private readonly _imageUrl: string;

  constructor(name: string, genre: Genre, biography: string, _id?: string) {
    this._name = name;
    this._biography = biography;
    this._genre = genre;
    this.id = _id;
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

  get createdAt(): Date {
    return this._createdAt;
  }
}
