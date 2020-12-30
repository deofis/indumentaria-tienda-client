import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFecha'
})
export class ConvertFechaPipe implements PipeTransform {

  transform(fecha:any): string {
    return new Date(fecha).toLocaleDateString('en-US', {day: '2-digit', month:'2-digit', year: '2-digit'}) + ' ' + new Date(fecha).toLocaleTimeString()
  }

}
