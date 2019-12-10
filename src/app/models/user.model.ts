import {Model} from './model.interface';

export class User extends Model {
  private firstName: string;
  private lastName: string;
  private email: string;
  private tickets: [string]; // [Ticket]

  constructor(firstName: string, lastName: string, email: string, tickets: [string], model: Model) {
    super(model.getVersion(), model.getCreatedAt(), model.getUpdatedAt());
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.tickets = tickets;
  }

  public getName(): string {
    return `${ this.firstName } ${ this.lastName }`;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getTickets(): [string] {
    return this.tickets;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
}
