import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../services/artist.service';
import {Artist} from '../../models/artist.model';
import {Genre} from '../../enums/genre.enum';
import * as UIkit from 'uikit';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  readonly genres = Genre.keys();
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getArtists()
      .subscribe(artists => this.artists = artists);
  }
}
