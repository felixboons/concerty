import {Component, Input, OnInit} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import * as jsonQuery from 'json-query';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Input() artists: Artist[] = [];
  artistsCopy: Artist[] = [];
  Genre = Genre;
  input: string;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
  }

  removeArtist(_id: string): void {
    this.artistService.deleteArtist(_id);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  search(): void {
    if (this.artistsCopy.length === 0) {
      this.artistsCopy = this.artists;
      console.log(this.artistsCopy);
    }

    if (this.input !== '') {
      // const regEx = new RegExp(`.*${this.input}.*/gi`);
      // const query = `[*name=~${regEx}][*_id=~${regEx}]`;

      // TODO: MAKE THE REGEX MATCH WITH INPUT.
      // - Regex check does work in this setup.
      // - It just doesn't match with my input correctly.
      const regEx = new RegExp(`.*${this.input}/gi`);
      const query = `[*name=~${regEx}]`;
      console.log(query);


      this.artists = jsonQuery(query, {
        data: this.artistsCopy,
        allowRegexp: true
      }).value;
      console.log(this.artists);
    } else {
      this.artists = this.artistsCopy;
    }
  }
}
