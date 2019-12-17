import { Component, OnInit } from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {ArtistService} from '../../../_services/artist.service';
import {Genre} from '../../../_enums/genre.enum';

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.scss']
})
export class ArtistManagementComponent implements OnInit {
  artists: Artist[] = [];
  Genre = Genre;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getArtists().subscribe(artists => this.artists = artists);
  }

  removeArtist(index: number): boolean {
    return null;
  }
}
