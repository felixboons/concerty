import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Concert} from '../_models/concert.model';
import {NotificationService} from './notification.service';
import {ArtistService} from './artist.service';
import {Artist} from '../_models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  private concerts: Concert[] = [];
  private artists: Artist[] = [];
  concertsSub = new BehaviorSubject<Concert[]>(this.concerts);

  constructor(private http: HttpClient,
              private artistService: ArtistService,
              private notifier: NotificationService) {
    this.artistService.artistsSub
      .subscribe(artists => {
        if (artists && artists.length > 0) {
          this.artists = artists;
          this.synchronize()
            .then(_ => console.log('Concert data retrieved'));
        }
      });
  }

  getConcerts(): Promise<Concert[]> {
    console.log(this.concerts);
    if (this.concerts && this.concerts.length > 0) {
      return new Promise<Concert[]>((resolve) => resolve(this.concerts));
    } else {
      return this.http.get<Concert[]>(this.url)
        .toPromise();
    }
  }

  getConcert(id: string): Concert {
    for (const concert of this.concerts) {
      if (concert._id === id) {
        return concert;
      }
    }
    return null;
  }

  createConcert(concert: Concert): void {
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description,
      artists: Concert.getArtistIds(concert.artists)
    };

    this.http.post<Concert>(this.url, body).toPromise()
      .then(concert => {
        concert = this.convertEmbeddedIdArrayToObjectArray(concert);
        this.concerts.unshift(concert);
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully created concert'));
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to create concert');
      });
  }

  editConcert(concert: Concert, index: number): void {
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description,
      artists: Concert.getArtistIds(concert.artists)
    };

    this.http.put<Concert>(this.url + '/' + concert._id, body)
      .toPromise()
      .then(concert => {
        concert = this.convertEmbeddedIdArrayToObjectArray(concert);
        this.concerts[index] = concert;
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully edited concert'));
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to edit concert');
      });
  }

  deleteConcert(id: string, index: number): void {
    this.http.delete<Concert>(this.url + '/' + id)
      .toPromise()
      .then(concert => {
        concert = this.convertEmbeddedIdArrayToObjectArray(concert);
        this.concerts.splice(index, 1);
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully deleted concert'));
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to delete concert');
      });
  }

  private synchronize(): Promise<void> {
    this.concertsSub.next(this.concerts);

    return new Promise<void>((resolve, reject) => {
      this.getConcerts() // TODO: If this doesnt work, return this promise.
        .then(concerts => {
          concerts = Concert.sortByDate(concerts);
          concerts = this.convertEmbeddedIdArraysToObjectArrays(concerts);
          this.concerts = concerts;
          this.concertsSub.next(concerts);
          resolve();
        })
        .catch(err => {
          console.log(err);
          this.notifier.showErrorNotification('Server error');
        });
    });
  }

  private convertEmbeddedIdArraysToObjectArrays(concerts: Concert[]): Concert[] {
    for (const concert of concerts) {
      concert.artists = Concert.getEmbeddedArtists(concert, this.artists);
    }
    return concerts;
  }

  private convertEmbeddedIdArrayToObjectArray(concert: Concert): Concert {
    concert.artists = Concert.getEmbeddedArtists(concert, this.artists);
    return concert;
  }
}
