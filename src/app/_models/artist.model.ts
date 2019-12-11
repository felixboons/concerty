import {Genre} from '../_enums/genre.enum';
import {Model} from './model.abstract-model';

export class Artist extends Model {
  name: string;
  biography: string;
  genre: Genre;
  imageUrl: string;

  constructor(name: string, biography: string, genre: Genre, model: Model) {
    super(model.getVersion(), model.getCreatedAt(), model.getUpdatedAt());
    this.name = name;
    this.biography = biography;
    this.genre = genre;
  }
}
