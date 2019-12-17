import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment'
import {Artist} from '../_models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artistObs = new Observable<Artist>();

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]|any> {
    return this.http
      .get(this.url);
  }

  createArtist(artist: Artist): boolean {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography
    };

    this.http.post(this.url, body).toPromise()
      .then(response => {
        // TODO: Add new artist to artist list.
        console.log(response);
        return true;
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });

    return false;
  }
}
