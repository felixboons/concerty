import {Injectable} from '@angular/core';
import {ConcertService} from './concert.service';
import {ArtistService} from './artist.service';

@Injectable({
  providedIn: 'root'
})
export class SynchronizationService {

  constructor(private concertService: ConcertService,
              private artistService: ArtistService) {
  }

  async synchronizeData(): Promise<void> {
    const artists = await this.artistService.getArtists();
    const concerts = await this.concertService.getConcerts();
  }
}
