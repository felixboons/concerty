import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../../../_models/artist.model';
import {ArtistService} from '../../../../_services/artist.service';
import {Genre} from '../../../../_enums/genre.enum';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss']
})
export class AllArtistsComponent implements OnInit {
  @Input() artists: Artist[] = [];
  pageOfArtists: Artist[] = [];
  Genre = Genre;

  constructor(private artistService: ArtistService) { }

  ngOnInit() { }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfArtists = pageOfItems;
  }

  removeArtist(_id: string): void {
    this.artistService.deleteArtist(_id);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }
}
