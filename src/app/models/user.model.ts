export class User {
  firstName: string;
  lastName: string;
  email: string;
  tickets: [string]; // [Ticket]

  constructor(firstName: string, lastName: string, email: string, tickets: [string]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.tickets = tickets;
  }
}
