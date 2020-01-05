import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../../_services/artist.service';
import {Artist} from '../../_models/artist.model';
import {Genre} from '../../_enums/genre.enum';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists: Artist[] = [];
  Genre = Genre;

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.artistService.artistsSub
      .subscribe(artists => this.artists = artists);
  }
}
