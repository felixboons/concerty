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
  discoverArtists: Artist[] = [];
  discoverAmount = 5;
  Genre = Genre;

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.artistService.artistsSub
      .subscribe(artists => {
        this.artists = artists;
        if (artists && artists.length > 0) {
          this.selectArtistsToDiscover(artists);
        }
      });

  }

  private selectArtistsToDiscover(artists: Artist[]) {
    const artistsCopy = JSON.parse(JSON.stringify(artists));
    const shuffledArtists = this.shuffle(artistsCopy);

    const discoverArtists: Artist[] = [];
    for (let i = 0; i < this.discoverAmount; i ++) {
      discoverArtists.push(shuffledArtists[i]);
    }

    this.discoverArtists = discoverArtists;
  }

  private shuffle(o) {
    for (let j, g, t = o.length; t; j = Math.floor(Math.random() * t), g = o[--t], o[t] = o[j], o[j] = g) {
      ;
    }
    return o;
  };
}
