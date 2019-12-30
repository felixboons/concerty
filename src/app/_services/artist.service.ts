import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {NotificationService} from './notification.service';
import {Artist} from '../_models/artist.model';
import {CacheService} from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artists: Artist[] = [];
  artistsSubject = new BehaviorSubject<Artist[]>(null);

  constructor(private http: HttpClient,
              private cache: CacheService,
              private notifier: NotificationService) {
    // this.readArtistsFromCache();
    // this.getArtists().subscribe(artists => {
    //   artists.reverse();
    //   this.artists = artists;
    //   this.artistsSubject.next(artists);
    //   // this.cache.setArtists(artists);
    // });
  }

  getArtists(): void {
    console.log('artistService');
    this.http
      .get(this.url)
      .pipe(map((response: Artist[]) => response),
        catchError(err => {
          this.notifier.showErrorNotification('Something went wrong');
          console.log(err);
          return throwError('Server responded with unexpected object type');
        })
      ).toPromise()
      .then((res => console.log(res)))
      .catch(res => console.log(res));
  }

  // getArtists(): Observable<Artist[]> {
  //   return this.http
  //     .get<Artist[]>(this.url)
  //     .pipe(map(response => response),
  //       catchError(err => {
  //         console.log(err);
  //         return throwError('Server responded with unexpected object type');
  //       })
  //     );
  // }

  getArtist(_id: string): Artist {
    for (const artist of this.artists) {
      if (artist._id === _id) {
        return artist;
      }
    }
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
          this.notifier.showErrorNotification('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(artist => {
        this.artists.unshift(artist);
        this.artistsSubject.next(this.artists);
        this.notifier.showErrorNotification('Successfully created artist');
      })
      .catch(err => {
        console.log(err);
        this.notifier.showErrorNotification('Failed to create artist');
      });
  }

  editArtist(artist: any, index: number): void {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography,
    };

    const url = this.url + '/' + artist._id;
    this.http.put<Artist>(url, body)
      .pipe(map(response => response),
        catchError(err => {
          this.notifier.showErrorNotification('Something went wrong');
          return throwError('Server responded with unexpected object type');
        }))
      .toPromise()
      .then(artist => {
        console.log(artist);
        this.artists[index] = artist;
        this.artistsSubject.next(this.artists);
        this.notifier.showSuccessNotification('Successfully edited artist');
      })
      .catch(err => {
        this.notifier.showErrorNotification('Failed to edit artist');
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
        // this.cache.setArtists(this.artists);
      })
      .catch(err => {

      });
  }

  private readArtistsFromCache(): void {
    this.artists = this.cache.getArtists();
  }
}
