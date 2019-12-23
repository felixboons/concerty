import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArtistService} from '../../../../_services/artist.service';
import {Artist} from '../../../../_models/artist.model';
import {Genre} from '../../../../_enums/genre.enum';
import * as $ from 'jquery';
import {SearchHelper} from '../../../../_helpers/searchHelper';

@Component({
  selector: 'app-find-artist',
  templateUrl: './find-artist.component.html',
  styleUrls: ['./find-artist.component.scss']
})
export class FindArtistComponent implements OnInit {
  @Output() artistSelected = new EventEmitter<Artist>();
  @Input() artists: Artist[] = [];
  artistsCopy: Artist[] = [];
  // @Input()
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

    this.artists = SearchHelper.searchArtists(this.input, this.artistsCopy);
  }
}
