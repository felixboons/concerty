import {Component, OnDestroy, OnInit} from '@angular/core';
import {Concert} from '../../_models/concert.model';
import {ConcertService} from '../../_services/concert.service';
import {DateHelper} from '../../_helpers/date-helper';
import {Artist} from '../../_models/artist.model';
import {ArtistService} from '../../_services/artist.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  concerts: Concert[] = [];
  upcomingConcerts: Concert[] = [];
  artists: Artist[] = [];
  recentlyAddedArtists: Artist[] = [];

  constructor(private concertService: ConcertService,
              private artistService: ArtistService) {
  }

  ngOnInit() {
    if (this.subscriptions.length === 0) {
      this.subscribeToConcerts();
      this.subscribeToArtists();
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  private subscribeToConcerts() {
    const sub = this.concertService.concertsSub
      .subscribe(concerts => {
        if (concerts) {
          this.concerts = concerts;
          this.initializeUpcomingConcerts();
        }
      });
    this.subscriptions.push(sub);
  }

  private subscribeToArtists() {
    const sub = this.artistService.artistsSub
      .subscribe(artists => {
        if (artists) {
          this.artists = artists;
          this.initializeRecentlyAddedArtists();
        }
      });
    this.subscriptions.push(sub);
  }

  private initializeUpcomingConcerts() {
    this.upcomingConcerts = [];

    for (const concert of this.concerts) {
      if (DateHelper.isUpcoming(concert.date)) {
        this.upcomingConcerts.push(concert);
      }
    }
  }

  private initializeRecentlyAddedArtists() {
    this.recentlyAddedArtists = [];

    for (const artist of this.artists) {
      if (DateHelper.isRecentlyAdded(artist.createdAt)) {
        this.recentlyAddedArtists.push(artist);
      }
    }
  }
}
