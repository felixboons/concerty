import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient,
              private userService: UserService,
              private cache: CacheService,
              private router: Router) {
    const token = this.cache.getToken();

    if (token) {
      this.updateLoginStatus(true);
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
          console.log('SERVER REJECTED LOGIN');
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
    console.log(!!token);
    return !!token;
  }

  updateLoginStatus(status: boolean): void {
    this.loginStatus.next(status);
  }

  private redirectAfterLogin(): void {
    this.router.navigateByUrl('account');
  }
}
