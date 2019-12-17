import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Promise<boolean> {
    const body = {
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      password: user.getPassword()
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body).toPromise()
        .then(response => {
          console.log(response);
          resolve();
        })
        .catch(reason => {
          console.log(reason);
          reject();
        });
    });
  }
}
