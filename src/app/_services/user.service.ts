import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Promise<void> {
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };

    return new Promise<void>((resolve, reject) => {
      this.http.post<User>(this.url, body)
        .toPromise()
        .then(response => {
          console.log(response);
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  }

  getUser(id: string): Promise<User> {
    return this.http.get<User>(this.url + '/' + id)
      .pipe(catchError(err => throwError(err)))
      .toPromise();
  }
}
