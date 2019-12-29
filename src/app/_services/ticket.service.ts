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

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  buyTicket(items: TicketItem[], concertId: string): Promise<string> {
    const currentUser = this.authService.getCurrentUser();
    const url = this.url + currentUser._id + '/tickets';

    const body = {
      customerName: currentUser.firstName + ' ' + currentUser.lastName,
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
      this.http.post(url, body).toPromise()
        .then((user: User) => {
          this.updateTickets(user);
          resolve();
        })
        .catch(reason => {
        });
    });
  }

  private updateTickets(user: User): void {
    this.authService.isAuthenticatedSubject
      .next(user);
  }
}
