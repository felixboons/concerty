import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from '../models/artist.model';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  artistsObs = new Observable<Artist>();

  constructor(private http: HttpClient) { }

  getArtists(): Observable<any> {
    return this.http
      .get(this.url);
  }
}
