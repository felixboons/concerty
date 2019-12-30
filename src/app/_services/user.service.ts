import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Promise<boolean> {
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };

    return new Promise((resolve, reject) => {
      this.http.post<User>(this.url, body)
        .toPromise()
        .then(response => {
          resolve();
        })
        .catch(reason => {
          reject();
        });
    });
  }

  getUser(id: string): Promise<User> {
    return this.http.get<User>(this.url + '/' + id)
      .toPromise();
  }
}
