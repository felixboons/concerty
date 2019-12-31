import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {CacheService} from './cache.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {User} from '../_models/user.model';
import {Role} from '../_enums/role.enum';
import {ConcertService} from './concert.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.serverUrlPrefix + 'auth/login';
  private currentUser: User;
  currentUserSub = new BehaviorSubject<User>(this.currentUser);

  constructor(private userService: UserService,
              private concertService: ConcertService,
              private cache: CacheService,
              private http: HttpClient,
              private router: Router) {
    this.establishLoginSession();
  }

  login(email: string, password: string): Promise<string> {
    const body = { email, password };

    return new Promise((resolve, reject) => {
      this.http.post<User>(this.url, body)
        .pipe(catchError(err => throwError(err)))
        .toPromise()
        .then(response => {

          this.cache.setToken(response['token']);
          let user = response['user'];

          console.log(response);
          this.concertService.getConcerts() // TODO: << error: concertService is undefined.
            .then(concerts => {
              console.log(concerts);
              user = User.getEmbeddedConcertForTickets(user, concerts);
              this.synchronize()
                .then(_ => resolve())
                .catch(_ => {
                  console.log('fail');
                  reject();
                })
            })
            .catch(err => {
              console.log('eroorr');
              reject();
            });
        })
        .catch(err => {
          console.log(err);
          console.log('err');
          reject();
        });
    });
  }

  isAuthenticated(): boolean {
    const token = this.cache.getToken();
    const user = this.cache.getUser();
    return !!token && !!user;
  }

  isAdministrator(): boolean {
    return this.isAuthenticated() && this.currentUser.role === Role.ADMIN;
  }

  logout(): void {
    this.cache.removeToken();
    this.cache.removeUser();
    this.router.navigateByUrl('login');
    this.currentUserSub.next(null);
  }


  synchronize(): Promise<void> {
    this.currentUserSub.next(this.currentUser);

    return new Promise<void>((resolve, reject) => {
      this.userService.getUser(this.currentUser._id)
        .then(user => {

          this.concertService.getConcerts()
            .then(concerts => {
              user = User.getEmbeddedConcertForTickets(user, concerts);
              console.log(user);
              this.currentUser = user;
              this.cache.setUser(user);
              this.currentUserSub.next(user);
              resolve()
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    });
  }

  private establishLoginSession(): void {
    if (!this.isAuthenticated()) {
      this.logout();
    } else {
      this.readCurrentUserFromCache();
      this.synchronize()
        .then(_ => console.log('SYNCHRONIZED CURRENT USER DATA'))
        .catch(_ => this.logout());
    }
  }

  private readCurrentUserFromCache(): void {
    this.currentUser = this.cache.getUser();
  }
}
