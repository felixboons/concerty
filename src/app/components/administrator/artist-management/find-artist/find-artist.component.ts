import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import * as $ from 'jquery';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Output() artistSelected = new EventEmitter<Artist>();
  @Input() artists: Artist[] = [];
  artistsCopy: Artist[] = [];
  Genre = Genre;
  input: string;

  constructor(private artistService: ArtistService) { }

  ngOnInit() { }

  removeArtist(_id: string): void {
    this.artistService.deleteArtist(_id);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  selectArtist(artist: Artist): void {
    this.artistSelected.emit(artist);
    $('.uk-close').click();
  }

  search(): void {
    if (this.artistsCopy.length === 0) {
      this.artistsCopy = this.artists;
    }

    // Only when there is valid input -> search.
    if (this.input !== '') {
      const input = this.input.toLowerCase();

      this.artists = this.artistsCopy.filter(artist => {
        return FindArtistComponent.idMatchesInput(artist._id, input) ||
          FindArtistComponent.nameMatchesInput(artist.name, input) ||
          FindArtistComponent.genreMatchesInput(artist.genre, input);
      });
    } else {

      // Show all concerts.
      this.artists = this.artistsCopy;
    }
  }

  private static idMatchesInput(id: string, input: string): boolean {
    id = id.toLowerCase();
    return id.indexOf(input) > -1;
  }

  private static nameMatchesInput(name: string, input: string): boolean {
    name = name.toLowerCase();
    return name.indexOf(input) > -1;
  }

  private static genreMatchesInput(genre: Genre, input: string): boolean {
    const genreString = Genre[genre].toLowerCase();
    return genreString.indexOf(input) > -1;
  }
}
