import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment'
import {Artist} from '../_models/artist.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artists: Artist[] = [];
  artistsObs = new Subject<Artist[]>();

  constructor(private http: HttpClient) {
    this.getArtists().subscribe(artists => {
      console.log(artists);
      this.artists = artists;
      this.artistsObs.next(artists);
    });
  }

  createArtist(artist: Artist): boolean {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography
    };

    this.http.post(this.url, body).toPromise()
      .then(artist => {
        if (artist instanceof Artist) {
          this.artists.push(artist);
          this.artistsObs.next(this.artists);
        }
        return true;
      })
      .catch(reason => {
        console.log(reason);
        return false;
      });

    return false;
  }

  deleteArtist(index: number): void {
    const artistId = this.artists[index]._id;
    console.log(artistId);
    const url = this.url + '/' + artistId;
    console.log(url);

    this.http.delete(url).toPromise()
      .then(_ => {
        this.artists.splice(index, 1);
      })
      .catch(err => {
        return false;
      });

  }

  private getArtists(): Observable<Artist[]|any> {
    return this.http
      .get(this.url);
  }
}
