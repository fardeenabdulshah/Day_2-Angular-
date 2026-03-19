import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizepipe',
})
export class CapitalizePipePipe implements PipeTransform {
  transform(value:string): string {

   if(!value) return '';
   return value.charAt(0);
  }
}
