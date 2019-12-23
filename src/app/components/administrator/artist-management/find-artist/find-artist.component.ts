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
  @Input() uniqueModalId: string;
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

  selectArtist(artist: Artist): void {
    console.log('selectArtist in find-artist');
    console.log(artist);
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
