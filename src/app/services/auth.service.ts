import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient,
              private cache: CacheService) {
    const token = this.cache.getToken();

    if (token) {
      this.updateLoginStatus(true);
    }
  }

  login(email: string, password: string): boolean {
    const body = { email, password };

    this.http.post(this.url, body).toPromise()
      .then(response => console.log(response));

    return true;
  }

  updateLoginStatus(status: boolean): void {
    this.loginStatus.next(status);
  }
}
