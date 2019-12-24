import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyHelper} from '../_helpers/currency-helper';

@Pipe({
  name: 'prettyPrice'
})
export class PrettyPricePipe implements PipeTransform {

  transform(price: number, ...args: any[]): string {
    return new CurrencyHelper().getPrettyPrice(price);
  }
}
