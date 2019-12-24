import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'prettyId'
})
export class PrettyIdPipe implements PipeTransform {
  private readonly digits = 5;

  transform(id: string, ...args: any[]): string {
    return id.substring(id.length - this.digits, id.length);
  }
}
