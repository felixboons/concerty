import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../_models/user.model';
import {Ticket} from '../_models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = environment.serverUrlPrefix + 'users/';
  ticketsSubject = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  buyTickets(ticket: Ticket): Promise<string> {
    const currentUser = this.authService.getCurrentUser();


    const url = this.url + currentUser._id + '/tickets';

    return new Promise((resolve, reject) => {
      this.http.post(url, ticket).toPromise()
        .then((user: User) => {
          const tickets = user.tickets;
          console.log(tickets);
          console.log(tickets);
          this.updateTickets(tickets);
        })
        .catch(reason => {
        });
    });
  }

  private updateTickets(ticket): void {
    this.ticketsSubject.next(ticket);
  }
}
