import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Concert} from '../_models/concert.model';
import {catchError, map} from 'rxjs/operators';
import {CacheService} from './cache.service';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  private concerts: Concert[] = [];
  concertsSubject = new BehaviorSubject<Concert[]>(null);

  constructor(private http: HttpClient,
              private cache: CacheService,
              private notifier: NotificationService) {
    this.readConcertsFromCache();

    this.getConcerts().subscribe(concerts => {
      if (concerts) {
        concerts.reverse();
        this.concerts = concerts;
        this.concertsSubject.next(concerts);
        this.cache.setConcerts(concerts);
      }
    });
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
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description
    };

    this.http.post(this.url, body)
      .pipe(map((response: Concert) => response),
        catchError(err => {
          this.notify('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {
        this.concerts.unshift(concert);
        this.concertsSubject.next(this.concerts);
        this.notify('Successfully created concert');
      })
      .catch(err => {
        console.log(err);
        this.notify('Failed to create concert', false);
      });
  }

  editConcert(concert: Concert, index: number): void {
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description
    };

    const url = this.url + '/' + concert._id;
    this.http.put(url, body)
      .pipe(map((response: Concert) => response),
        catchError(err => {
          this.notify('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(concert => {
        console.log(concert);
        this.concerts[index] = concert;
        this.concertsSubject.next(this.concerts);
        this.notify('Successfully edited concert');
      })
      .catch(err => {
        console.log(err);
        this.notify('Failed to edit concert', false);
      });
  }

  deleteConcert(_id: string): void {
    const url = this.url + '/' + _id;

    this.http.delete(url).toPromise()
      .then((concert: Concert) => {
        let index;

        this.concerts.forEach((value, i) => {
          if (concert._id === value._id) {
            index = i;
          }
        });
        this.concerts.splice(index, 1);
        this.concertsSubject.next(this.concerts);
        this.notify('Successfully deleted concert');
      })
      .catch(err => {
        console.log(err);
        this.notify('Failed to delete concert', false);
      });
  }

  private getConcerts(): Observable<Concert[] | any> {
    return this.http
      .get(this.url)
      .pipe(map((response: Concert[]) => response),
        catchError(err => {
          this.notify('Something went wrong', false);
          return throwError('Server responded with unexpected object array type');
        })
      );
  }

  private readConcertsFromCache(): void {
    const concerts = this.cache.getConcerts();
    if (concerts) {
      this.concerts = concerts;
    }
  }

  private notify(message: string, success = true): void {
    if (success) {
      this.notifier.showSuccessNotification(message);
    } else {
      this.notifier.showErrorNotification(message);
    }
  }
}
