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

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfArtists = pageOfItems;
  }

  removeArtist(index: number): void {
    this.artistService.deleteArtist(index);
  }

  getLastDigitsOfId(id: string, digits = 5): string {
    return id.substring(id.length - digits, id.length);
  }

}
