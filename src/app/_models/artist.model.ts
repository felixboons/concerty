import {Genre} from '../_enums/genre.enum';
import {Model} from './model.abstract-model';

export class Artist extends Model {
  name: string;
  biography: string;
  genre: Genre;
  imageUrl: string;

  constructor(name: string, genre: Genre, biography: string, model?: Model) {
    super(model ? model.getVersion() : null,
        model ? model.getCreatedAt(): null,
        model ? model.getUpdatedAt() : null);
    this.name = name;
    this.biography = biography;
    this.genre = genre;
  }
}
