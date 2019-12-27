import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {User} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  isAuthenticatedObs = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private userService: UserService,
              private cache: CacheService,
              private router: Router) {
    const token = this.cache.getToken();
    const currentUser: User = this.getCurrentUser();
    this.updateAuthentication(token, currentUser);
  }

  login(email: string, password: string): Promise<string> {
    const body = {email, password};

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body).toPromise()
        .then(response => {
          this.updateAuthentication(response['token'], response['user']);
          this.router.navigateByUrl('account');
          resolve();
        })
        .catch(reason => {
          this.updateAuthentication();
          reject();
        });
    });
  }

  logout(): void {
    this.cache.removeToken();
    this.cache.removeUser();
    this.router.navigateByUrl('login');
    this.isAuthenticatedObs.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  getCurrentUser(): User {
    return this.cache.getUser();
  }

  private getToken(): string {
    return this.cache.getToken();
  }

  private updateAuthentication(token: string = null, user: User = null): void {
    if (!token || !user) {
      this.logout();
    } else {
      this.cache.setToken(token);
      this.cache.setUser(user);
      this.isAuthenticatedObs.next(user);
    }
  }
}
