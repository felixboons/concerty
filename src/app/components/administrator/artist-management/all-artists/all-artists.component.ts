import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Artist} from '../../../../_models/artist.model';
import {ArtistService} from '../../../../_services/artist.service';
import {Genre} from '../../../../_enums/genre.enum';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss']
})
export class AllArtistsComponent implements OnInit {
  @Output() artistSelected = new EventEmitter<Artist>();
  @Input() artists: Artist[] = [];
  pageOfArtists: Artist[] = [];
  Genre = Genre;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
  }

  onChangePage(pageOfItems: Array<Artist>) {
    this.pageOfArtists = pageOfItems;
  }

  removeArtist(id: string, index: number): void {
    this.artistService.deleteArtist(id, index);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

  selectArtist(artist: Artist): void {
    this.artistSelected.emit(artist);
  }
}
