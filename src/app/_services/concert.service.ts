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
      concerts.reverse();
      this.concerts = concerts;
      this.concertsSubject.next(concerts);
    });
  }

  createConcert(concert: Concert): boolean {
    const body = {
      title: concert.title,
      venue: concert.venue,
      price: concert.price,
      ticketsTotal: concert.ticketsTotal,
      description: concert.description
    };

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

  deleteConcert(index: number): void {
    const concertId = this.concerts[index]._id;
    const url = this.url + '/' + concertId;

    this.http.delete(url).toPromise()
      .then(concert => {
        this.concerts.splice(index, 1);
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
