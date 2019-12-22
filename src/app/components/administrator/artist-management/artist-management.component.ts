import { Component, OnInit } from '@angular/core';
import {Artist} from '../../../_models/artist.model';
import {ArtistService} from '../../../_services/artist.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-artist-management',
  templateUrl: './artist-management.component.html',
  styleUrls: ['./artist-management.component.scss']
})
export class ArtistManagementComponent implements OnInit {
  artists: Artist[] = [];
  selectedArtist: Artist = null;
  selectedArtistIndex: number = null;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.artistsSubject
      .subscribe(artists => this.artists = artists);
  }

  artistSelected(artist: Artist): void {
    this.selectedArtist = artist;
    this.selectedArtistIndex = this.artists.indexOf(this.selectedArtist);
  }

  editArtistCanceled(): void {
    this.selectedArtist = null;
  }
}
