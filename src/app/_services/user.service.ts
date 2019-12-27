import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user.model';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';
  private currentUser: User = null;
  currentUserSubject = new Subject<User>();

  constructor(private http: HttpClient) {
    this.currentUserSubject
      .subscribe(user => this.currentUser = user);
  }

  createUser(user: User): Promise<boolean> {
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body).toPromise()
        .then(response => {
          resolve();
        })
        .catch(reason => {
          reject();
        });
    });
  }


  // TODO: Get user ID from token? Then do a call to server to retrieve data. Return observable and create subject etc etc
  getUser(_id: string): Observable<User> {
    return this.http.get(this.url + '/' + _id)
      .pipe(map((response: User) => response),
        catchError(err => {
          return throwError('Server responded with unexpected object array type');
        }));
  }
}
