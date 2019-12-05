import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Concert} from '../models/concert.mode';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  private readonly url = environment.serverUrlPrefix + 'concerts';
  concertObs = new Observable<Concert>();

  constructor(private http: HttpClient) { }

  getConcerts(): Observable<Concert[]|any> {
    console.log(this.url);
    return this.http
      .get(this.url);
  }
}
