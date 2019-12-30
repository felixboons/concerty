import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user.model';
import {Subject} from 'rxjs';
import {ConcertService} from './concert.service';
import {CacheService} from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.serverUrlPrefix + 'users';
  currentUser: User;
  currentUserSubject = new Subject<User>();

  constructor(private http: HttpClient,
              private concertService: ConcertService,
              private cache: CacheService) {
    this.readCurrentUserFromCache();
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

  replaceConcertIdsWithConcerts(user: User): User {
    const tickets = user.tickets;
    const _tickets = [];

    for (const ticket of tickets) {
      if (ticket.concert) {
        ticket.concert = this.concertService.getConcert(ticket.concert.toString()); // Fool the compiler with .toString()
        _tickets.push(ticket);
      }
    }

    user.tickets = _tickets;
    return user;
  }

  private readCurrentUserFromCache(): void {
    this.currentUser = this.cache.getUser();
  }
}
