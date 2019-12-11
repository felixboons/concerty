import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {User} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  isAuthenticatedObs = new Subject<boolean>();

  constructor(private http: HttpClient,
              private userService: UserService,
              private cache: CacheService,
              private router: Router) {
    const token = this.cache.getToken();

    if (token) {
      this.updateLoginStatus(!!token);
    }
  }

  login(email: string, password: string): Promise<string> {
    const body = { email, password };

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body).toPromise()
        .then(response => {
          this.cache.setToken(response['token']);
          this.updateLoginStatus(true);
          this.redirectAfterLogin();
          resolve();
        })
        .catch(reason => {
          this.updateLoginStatus(false);
          reject();
        });
    });
  }

  logout(): void {
    this.cache.removeToken();
    this.updateLoginStatus(false);
    this.router.navigateByUrl('login');
  }

  isAuthenticated(): boolean {
    const token = this.cache.getToken();
    return !!token;
  }

  getCurrentUser(): User {
    return null;
  }

  updateLoginStatus(status: boolean): void {
    this.isAuthenticatedObs.next(status);
  }

  private redirectAfterLogin(): void {
    this.router.navigateByUrl('account');
  }
}
