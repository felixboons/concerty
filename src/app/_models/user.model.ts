import {Ticket} from './ticket.model';
import {Concert} from './concert.model';

export class User {
  private readonly id: string;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: string;
  private _tickets: Ticket[];

  constructor(firstName: string, lastName: string, email: string, password: string, _id?: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this.id = _id;
  }

  public static getEmbeddedConcertForTickets(user: User, concerts: Concert[]): User {
    console.log(concerts);
    const tickets: Ticket[] = [];

    for (const ticket of user.tickets) {
      for (const concert of concerts) {
        const concertId = ticket.concert.toString(); // Concert is actually an ID. Fool TS with .toString().

        if (concert._id === concertId) {
          ticket.concert = concert;
          console.log(ticket);
        }
      }
      tickets.push(ticket);
    }

    user.tickets = tickets;
    return user;
  }

  get _id(): string {
    return this.id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): string {
    return this._role;
  }

  get tickets(): Ticket[] {
    return this._tickets;
  }

  set tickets(value: Ticket[]) {
    this._tickets = value;
  }
}
