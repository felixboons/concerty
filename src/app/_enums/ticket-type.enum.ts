
export enum TicketType {
  REGULAR = 'Regular seats',
  PREMIUM = 'Premium seats',
  GOLDEN_CIRCLE = 'Golden Circle'
}

export namespace TicketType {

  export function keys(): Array<string> {
    const amountOfExportedFunctions = 2;
    const keys = Object.keys(TicketType);
    const keysTrimmed = keys.slice(0, keys.length - amountOfExportedFunctions); // Remove export function names from array.
    return keysTrimmed.filter(val => {
      return val.length !== 1; // Filter out number values, while keeping the actual keys.
    });
  }

  export function getPrice(ticketType: TicketType, concertPrice: number): number {
    switch(ticketType) {
      case TicketType.REGULAR: return concertPrice;
      case TicketType.PREMIUM: return concertPrice * 1.5;
      case TicketType.GOLDEN_CIRCLE: return concertPrice * 3;
    }
  }
}
