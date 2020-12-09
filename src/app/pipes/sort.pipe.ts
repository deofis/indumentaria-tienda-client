import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultado = [];

    for (const producto of value) {
      if ( (producto.id.toString().indexOf(arg.toLowerCase())  > -1) || (producto.nombre.toLowerCase().indexOf(arg.toLowerCase())  > -1) ){
        resultado.push(producto)       
      };

    };

    return resultado;

  }

}
