import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';

  constructor(private http: HttpClient) { }

  createUser(firstName: string, lastName: string, email: string, plainPassword: string): Promise<boolean> {
    const body = { firstName, lastName, email, plainPassword };

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
