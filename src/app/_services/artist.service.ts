import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Artist} from '../_models/artist.model';
import {catchError, map} from 'rxjs/operators';

// TODO: Find a neater implementation to map server response to Artist.

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artists: Artist[] = [];
  artistsObs = new Subject<Artist[]>();

  constructor(private http: HttpClient) {
    this.getArtists().subscribe(artists => {
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

    this.http.post(this.url, body)
      .pipe(
        map((response: Artist) => response
        ), catchError(error => throwError('Something went wrong!'))
      ).toPromise()
      .then(artist => {
        this.artists.push(artist);
        this.artistsObs.next(this.artists);
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
    const url = this.url + '/' + artistId;

    this.http.delete(url).toPromise()
      .then(artist => {
        this.artists.splice(index, 1);
      })
      .catch(err => {
        return false;
      });

  }

  private getArtists(): Observable<Artist[]> {
    return this.http
      .get(this.url)
      .pipe(
        map((response: Artist[]) => response
      ), catchError(error => throwError('Something went wrong!'))
      )
  }
}
