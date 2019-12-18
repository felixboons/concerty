export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private role: number;
  private tickets: [string]; // [Ticket]

  constructor(firstName: string, lastName: string, email: string, password: string, id?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
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

  public getPassword(): string {
    return this.password;
  }
}
