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
    this.synchronize();
  }

  getConcerts(): Promise<Concert[]> {
    if (this.concerts && this.concerts.length > 0) {
      return new Promise<Concert[]>(resolve => resolve(this.concerts));
    } else {
      return this.http.get<Concert[]>(this.url)
        .pipe(map((response: Concert[]) => response),
          catchError(err => {
            this.notifier.showErrorNotification('Server error');
            console.log(err);
            return throwError('Server responded with UNEXPECTED object array type');
          })
        ).toPromise();
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

    this.http.post(this.url, body)
      .pipe(map((response: Concert) => response),
        catchError(err => {
          console.log(err);
          this.notifier.showErrorNotification('Server error');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {

        this.artistService.getArtists()
          .then(artists => {
            concert = ConcertService.convertEmbeddedIdArrayToObjectArray(concert, artists);
            this.synchronize();
            this.notifier.showSuccessNotification('Successfully created concert');
          })
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
      .pipe(map(response => response),
        catchError(err => {
          console.log(err);
          this.notifier.showErrorNotification('Server error');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {

        this.artistService.getArtists()
          .then(artists => {
            concert = ConcertService.convertEmbeddedIdArrayToObjectArray(concert, artists);
            this.concerts[index] = concert;
            this.synchronize();
            this.notifier.showSuccessNotification('Successfully edited concert');
          });
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to edit concert');
      });
  }

  deleteConcert(_id: string, index: number): void {
    const url = this.url + '/' + _id;

    this.http.delete<Concert>(url).toPromise()
      .then(concert => {

        this.artistService.getArtists() // Retrieve sub-document data.
          .then(artists => {
            concert = ConcertService.convertEmbeddedIdArrayToObjectArray(concert, artists);
            this.concerts.splice(index, 1);
            this.synchronize();
            this.notifier.showSuccessNotification('Successfully deleted concert');
          });
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to delete concert');
      });
  }

  private synchronize(): void {
    this.artistService.getArtists()
      .then(artists => {

        return this.getConcerts()
          .then(concerts => {
            concerts = ConcertService.convertEmbeddedIdArraysToObjectArrays(concerts, artists);
            this.concerts = concerts;
            this.concertsSubject.next(concerts);
          })
      })
      .catch(err => {
        this.notifier.showErrorNotification('Server error');
        console.log(err);
      });
  }

  private static convertEmbeddedIdArraysToObjectArrays(concerts: Concert[], artists: Artist[]): Concert[] {
    for (const concert of concerts) {
      concert.artists = Concert.getEmbeddedArtists(concert, artists);
    }
    return concerts;
  }


  private static convertEmbeddedIdArrayToObjectArray(concert: Concert, artists: Artist[]): Concert {
    concert.artists = Concert.getEmbeddedArtists(concert, artists);
    return concert;
  }

  private readConcertsFromCache(): void {
    // this.concerts = this.cache.getConcerts();
  }
}
