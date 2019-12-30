import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {User} from '../_models/user.model';
import {Role} from '../_enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  private currentUser: User;
  currentUserSub = new BehaviorSubject<User>(this.currentUser);

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private cache: CacheService) {
    this.establishLoginSession();
  }

  login(email: string, password: string): Promise<string> {
    const body = { email, password };

    return new Promise((resolve, reject) => {
      this.http.post(this.url, body).toPromise()
        .then(response => {
          this.cache.setToken(response['token']);
          let user = response['user'];
          user = this.userService.replaceConcertIdsWithConcerts(user);
          this.updateAuthentication(user);
          resolve();
        })
        .catch(reason => {
          this.updateAuthentication();
          reject();
        });
    });
  }

  isAuthenticated(): boolean {
    const token = this.cache.getToken();
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  isAdministrator(): boolean {
    return this.currentUser.role === Role.ADMIN;
  }

  logout(): void {
    this.cache.removeToken();
    this.cache.removeUser();
    this.router.navigateByUrl('login');
    this.currentUserSub.next(null);
  }

  getCurrentUser(): User {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      this.userService.getUser(this.currentUser._id);
    }
  }

  updateAuthentication(user: User = null): void {
    const token = this.cache.getToken();
    if (!token || !user) {
      this.logout();
    } else {
    }
  }

  private readCurrentUserFromCache(): void {
    this.currentUser = this.cache.getUser();
    this.currentUserSub.next(this.currentUser);
  }

  private establishLoginSession(): void {
    if (!this.isAuthenticated()) {
      this.logout();
      return;
    } else {
    }
      this.readCurrentUserFromCache();

      if (this.currentUser) {
        this.synchronize()
          .then(_ => {
            this.currentUser = user;
            this.cache.setUser(user);
            this.currentUserSub.next(user);
          })
          .catch(_ => this.logout());
      }

  }

  private synchronize(): Promise<void> {
    this.currentUserSub.next(this.currentUser);

    return new Promise<void>((resolve, reject) => {
      this.userService.getUser(this.currentUser._id)
        .then(user => {
          console.log(user);
          user = UserService.
          console.log(user);
          this.currentUser = user;
          this.currentUserSub.next(user);
        })
    })
  }
}
