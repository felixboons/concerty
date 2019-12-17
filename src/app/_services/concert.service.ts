import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Concert} from '../_models/concert.mode';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  private concertObs = new Observable<Concert>();

  constructor(private http: HttpClient) { }

  getConcerts(): Observable<Concert[]|any> {
    console.log(this.url);
    return this.http
      .get(this.url);
  }
}
