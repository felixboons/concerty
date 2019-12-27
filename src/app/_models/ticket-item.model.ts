export class TicketItem {

  private readonly _type: string;
  private readonly _price: number;
  private readonly _amount: number;

  constructor(type: string, price: number, amount: number) {
    this._type = type;
    this._price = price;
    this._amount = amount;
  }

  get type(): string {
    return this._type;
  }

  get price(): number {
    return this._price;
  }

  get amount(): number {
    return this._amount;
  }
}
