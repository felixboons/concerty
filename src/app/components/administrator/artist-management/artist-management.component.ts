import { Component, OnInit } from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {ArtistService} from '../../../_services/artist.service';

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.scss']
})
export class ArtistManagementComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.artistsSubject.subscribe(artists => this.artists = artists);
  }
}
