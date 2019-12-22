import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Artist} from '../_models/artist.model';
import {catchError, map} from 'rxjs/operators';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artists: Artist[] = [];
  artistsSubject = new BehaviorSubject<Artist[]>(null);

  constructor(private http: HttpClient,
              private notifier: NotificationService) {
    this.getArtists().subscribe(artists => {
      artists.reverse();
      this.artists = artists;
      this.artistsSubject.next(artists);
    });
  }

  createArtist(artist: Artist): void {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography
    };

    this.http.post(this.url, body)
      .pipe(map((response: Artist) => response),
        catchError(err => {
          this.notify('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(artist => {
        this.artists.unshift(artist);
        this.artistsSubject.next(this.artists);
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  editArtist(artist: any, index: number): void {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography,
    };

    const url = this.url + '/' + artist._id;
    this.http.put(url, body)
      .pipe(map((response: Artist) => response),
        catchError(err => {
          this.notify('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(artist => {
        console.log(artist);
        this.artists[index] = artist;
        this.artistsSubject.next(this.artists);
        this.notify('Successfully edited artist');
      })
      .catch(err => {
        this.notify('Failed to edit artist', false);
        console.log(err);
      });
  }

  deleteArtist(_id: string): void {
    const url = this.url + '/' + _id;

    this.http.delete(url).toPromise()
      .then((artist: Artist) => {
        let index;

        this.artists.forEach((value, i) => {
          if (artist._id === value._id) {
            index = i;
          }
        });

        this.artists.splice(index, 1);
        this.artistsSubject.next(this.artists);
      })
      .catch(err => {

      });
  }

  private getArtists(): Observable<Artist[]> {
    return this.http
      .get(this.url)
      .pipe(map((response: Artist[]) => response),
        catchError(err => {
          this.notify('Something went wrong', false);
          return throwError('Server responded with unexpected object type');
        })
      );
  }

  private notify(message: string, success = true): void {
    if (success) {
      this.notifier.showSuccessNotification(message);
    } else {
      this.notifier.showErrorNotification(message);
    }
  }
}
