import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultado = [];

    for (const objeto of value) {
      if ( (objeto.id.toString().indexOf(arg.toLowerCase())  > -1) || (objeto.nombre.toLowerCase().indexOf(arg.toLowerCase())  > -1) ){
        resultado.push(objeto)       
      };

    };

    return resultado;

  }

}
