import {Genre} from '../enums/genre.enum';

export class Artist {
  name: string;
  biography: string;
  genre: Genre;
  imageUrl: string;

  constructor(name: string, biography: string, genre: Genre) {
    this.name = name;
    this.biography = biography;
    this.genre = genre;
  }
}
