import {Role} from '../_enums/role.enum';

export class User {
  private readonly id: string;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: number;
  private readonly _tickets: [string]; // [Ticket]

  constructor(firstName: string, lastName: string, email: string, password: string, _id?: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
    this.id = _id;
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

  get role(): number {
    return this._role;
  }

  get tickets(): [string] {
    return this._tickets;
  }
}
