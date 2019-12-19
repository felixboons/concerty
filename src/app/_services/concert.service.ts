import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Concert} from '../_models/concert.mode';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  private concerts: Concert[] = [];
  concertsSubject = new BehaviorSubject<Concert[]>(null);

  constructor(private http: HttpClient) {
    this.getConcerts().subscribe(concerts => {
      if (concerts) {
        concerts.reverse();
        this.concerts = concerts;
        this.concertsSubject.next(concerts);
      }
    });
  }

  createConcert(concert: Concert): boolean {
    const body = {
      title: concert.title,
      venue: concert.venue,
      date: concert.date,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description
    };
    console.log(concert);
    console.log(body);

    this.http.post(this.url, body)
      .pipe(
        map((response: Concert) => response
        ), catchError(error => throwError('Server responded with unexpected object type'))
      ).toPromise()
      .then(concert => {
        this.concerts.unshift(concert);
        this.concertsSubject.next(this.concerts);
        return true;
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });

    return false;
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
      })
      .catch(err => {
        return false;
      });

  }

  private getConcerts(): Observable<Concert[] | any> {
    return this.http
      .get(this.url)
      .pipe(
        map((response: Concert[]) => response
        ), catchError(error => throwError('Server responded with unexpected object array type'))
      );
  }
}
