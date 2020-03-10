import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {NotificationService} from './notification.service';
import {Artist} from '../_models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private readonly url = environment.serverUrlPrefix + 'artists';
  private artists: Artist[] = [];
  artistsSub = new BehaviorSubject<Artist[]>(this.artists);

  constructor(private http: HttpClient,
              private notifier: NotificationService) {
    this.synchronize()
      .then();
  }

  getArtists(): Promise<Artist[]> {
    if (this.artists && this.artists.length > 0) {
      return new Promise<Artist[]>(resolve => resolve(this.artists));
    } else {
      return this.http.get<Artist[]>(this.url)
        .toPromise();
    }
  }

  createArtist(artist: Artist): void {
    const body = {
      name: artist.name,
      genre: artist.genre,
      biography: artist.biography
    };

    this.http.post<Artist>(this.url, body)
      .toPromise()
      .then(artist => {
        this.artists.unshift(artist);
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully created artist'));
      })
      .catch(err => {
        // console.log(err);
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
      .toPromise()
      .then(artist => {
        this.artists[index] = artist;
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully edited artist'));
      })
      .catch(err => {
        this.notifier.showErrorNotification('Failed to edit artist');
        // console.log(err);
      });
  }

  deleteArtist(id: string, index: number): void {
    this.http.delete<Artist>(this.url + '/' + id).toPromise()
      .then(artist => {
        this.artists.splice(index, 1);
        this.synchronize()
          .then(_ => this.notifier.showSuccessNotification('Successfully deleted artist'));
      })
      .catch(err => {
        this.notifier.showErrorNotification('Failed to delete artist');
        // console.log(err);
      });
  }

  private synchronize(): Promise<void> {
    this.artistsSub.next(this.artists);

    return new Promise<void>((resolve, reject) => {
      this.getArtists()
        .then(artists => {
          this.artists = artists;
          this.artistsSub.next(artists);
          resolve();
        })
        .catch(err => {
          // console.log(err);
          this.notifier.showErrorNotification('Server error')
        });
    });
  }
}
