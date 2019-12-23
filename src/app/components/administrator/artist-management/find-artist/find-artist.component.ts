import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import {SearchHelper} from '../../../../_helpers/searchHelper';
import * as $ from 'jquery';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Output() artistSelectedToEdit = new EventEmitter<Artist>();
  @Output() artistSelectedToAdd = new EventEmitter<Artist>();
  @Input() clickToAdd = false;
  @Input() artists: Artist[] = [];
  artistsCopy: Artist[] = [];
  Genre = Genre;
  input: string;

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() { }

  removeArtist(_id: string): void {
    this.artistService.deleteArtist(_id);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  selectArtist(artist: Artist): void {
    if (this.clickToAdd) {
      this.artistSelectedToAdd.emit(artist);
    } else {
      this.artistSelectedToEdit.emit(artist);
    }

    // Close search component.
    $('.uk-close').click();
  }

  search(): void {
    if (this.artistsCopy.length === 0) {
      this.artistsCopy = this.artists;
    }

    this.artists = SearchHelper.searchArtists(this.input, this.artistsCopy);
  }
}
