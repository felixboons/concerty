import {Component, OnInit} from '@angular/core';
import {Concert} from '../../_models/concert.model';
import {ConcertService} from '../../_services/concert.service';
import {DateHelper} from '../../_helpers/date-helper';
import {Artist} from '../../_models/artist.model';
import {ArtistService} from '../../_services/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  concerts: Concert[] = [];
  upcomingConcerts: Concert[] = [];

  artists: Artist[] = [];
  recentlyAddedArtists: Artist[] = [];

  constructor(private concertService: ConcertService,
              private artistService: ArtistService) {
  }

  ngOnInit() {
    this.subscribeToConcerts();
    this.subscribeToArtists();
  }

  private subscribeToConcerts() {
    this.concertService.concertsSub
      .subscribe(concerts => {
        if (concerts) {
          this.concerts = concerts;
          this.initializeUpcomingConcerts();
        }
      });
  }

  private subscribeToArtists() {
    this.artistService.artistsSub
      .subscribe(artists => {
        if (artists) {
          this.artists = artists;
          this.initializeRecentlyAddedArtists();
        }
      });
  }

  private initializeUpcomingConcerts() {
    for (const concert of this.concerts) {
      if (DateHelper.isUpcoming(concert.date)) {
        this.upcomingConcerts.push(concert);
      }
    }
  }

  private initializeRecentlyAddedArtists() {
    for (const artist of this.artists) {
      if (DateHelper.isRecentlyAdded(artist.createdAt)) {
        this.recentlyAddedArtists.push(artist);
      }
    }
  }
}
