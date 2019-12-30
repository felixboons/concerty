import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {User} from '../_models/user.model';
import {TicketItem} from '../_models/ticket-item.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = environment.serverUrlPrefix + 'users/';
  private currentUser: User;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.authService.currentUserSub
      .subscribe(user => this.currentUser = user);
  }

  buyTicket(items: TicketItem[], concertId: string): Promise<User> {
    const url = this.url + this.currentUser._id + '/tickets';

    const body = {
      customerName: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      items: [],
      concert: concertId
    };

    // Replace _underscore properties names by non-underscore properties.
    for (const item of items) {
      body.items.push({
        type: item.type,
        price: item.price,
        amount: item.amount
      });
    }

    return new Promise((resolve, reject) => {
      this.http.post<User>(url, body).toPromise()
        .then(user => {
          console.log(user);
          this.updateTickets(user[0]); // Concert is also send in response?
          resolve(user);
        })
        .catch(reason => {
          reject(null);
        });
    });
  }

  private updateTickets(user: User): void {
    // TODO: Sync current user
    // this.authService.
  }
}
