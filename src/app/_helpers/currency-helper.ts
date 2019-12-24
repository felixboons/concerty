export class CurrencyHelper {

  getPrettyPrice(price: number): string {
    const format = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
      });
    return format.format(price);
  }
}
