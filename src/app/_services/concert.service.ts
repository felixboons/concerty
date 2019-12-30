import {Injectable} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Concert} from '../_models/concert.model';
import {catchError, map} from 'rxjs/operators';
import {CacheService} from './cache.service';
import {NotificationService} from './notification.service';
import {ArtistService} from './artist.service';
import {Artist} from '../_models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  private concerts: Concert[] = [];
  concertsSubject = new BehaviorSubject<Concert[]>(this.concerts);

  constructor(private artistService: ArtistService,
              private http: HttpClient,
              private cache: CacheService,
              private notifier: NotificationService) {
    this.synchronizeConcerts();
  }

  // TODO: Run this every time data CRUD actions are taken.
  private synchronizeConcerts(): void {
      this.artistService.getArtists()
        .then(artists => {

          return this.getConcerts()
            .then(concerts => {
              concerts = ConcertService.convertEmbeddedIdArrayToObjectArray(concerts, artists);
              this.concerts = concerts;
              this.concertsSubject.next(concerts);
              console.log(concerts);
            })
        })
        .catch(err => {
          this.notifier.showErrorNotification('Something went wrong');
          console.log(err);
        });
  }

  getConcerts(): Promise<Concert[]> {
    if (this.concerts && this.concerts.length > 0) {
      return new Promise<Concert[]>(resolve => resolve(this.concerts));
    } else {
      return this.http.get<Concert[]>(this.url)
        .pipe(map((response: Concert[]) => response),
          catchError(err => {
            this.notifier.showErrorNotification('Something went wrong');
            console.log(err);
            return throwError('Server responded with UNEXPECTED object array type');
          })
        ).toPromise();
    }
  }

  getConcert(_id: string): Concert {
    for (const concert of this.concerts) {
      if (concert._id === _id) {
        return concert;
      }
    }
    return null;
  }

  createConcert(concert: Concert): void {
    const artistIds = Concert.getArtistIds(concert.artists); // Should do this in constructor.
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description,
      artists: artistIds
    };

    this.http.post(this.url, body)
      .pipe(map((response: Concert) => response),
        catchError(err => {
          console.log(err);
          this.notifier.showErrorNotification('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {
        concert = this.convertEmbeddedObjectToIdArray(concert);
        this.concerts.unshift(concert);
        this.synchronizeConcerts();
        this.notifier.showSuccessNotification('Successfully created concert');
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to create concert');
      });
  }

  editConcert(concert: Concert, index: number): void {
    const artistIds = Concert.getArtistIds(concert.artists);
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description,
      artists: artistIds
    };

    this.http.put(this.url + '/' + concert._id, body)
      .pipe(map((response: Concert) => response),
        catchError(err => {
          console.log(err);
          this.notifier.showErrorNotification('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {
        concert = this.convertEmbeddedObjectToIdArray(concert);
        this.concerts[index] = concert;
        this.synchronizeConcerts();
        this.notifier.showSuccessNotification('Successfully edited concert');
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to edit concert');
      });
  }

  deleteConcert(_id: string): void {
    const url = this.url + '/' + _id;

    this.http.delete(url).toPromise()
      .then((concert: Concert) => {
        concert = this.convertEmbeddedObjectToIdArray(concert);
        let index;

        this.concerts.forEach((value, i) => {
          if (concert._id === value._id) {
            index = i;
          }
        });
        this.concerts.splice(index, 1);
        this.synchronizeConcerts();
        this.notifier.showSuccessNotification('Successfully deleted concert');
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to delete concert');
      });
  }

  private readConcertsFromCache(): void {
    // this.concerts = this.cache.getConcerts();
  }

  private static convertEmbeddedIdArrayToObjectArray(concerts: Concert[], artists: Artist[]): Concert[] {
    for (const concert of concerts) {
      concert.artists = Concert.getEmbeddedArtists(concert, artists);
    }

    return concerts;
  }


  private convertEmbeddedObjectToIdArray(concert: Concert): Concert {
    const _concert = concert;
    const _artists = [];

    for (const artistId of concert.artists) {
      const artist = this.artistService.getArtist(artistId.toString()); // Fool the compiler with .toString()
      _artists.push(artist);
    }

    _concert.artists = _artists;
    return _concert;
  }
}
