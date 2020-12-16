import { Marca } from './../../products/clases/marca';
import { MarcasService } from './../../admin-options/marcas.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor( private marcasService: MarcasService) { }

  passwordIguales(pass1: string, pass2: string) {
    return(formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noIgual: true })};
      }
    }

  validarFechas(fechaUno: string, fechaDos:string) {

    return (formGroup: FormGroup) => {

      const fechaDesde = formGroup.controls[fechaUno];
      const fechaHasta = formGroup.controls[fechaDos];

      if (new Date(fechaDesde.value).getTime() < new Date(fechaHasta.value).getTime()) {
        fechaHasta.setErrors(null);
      } else {
        fechaHasta.setErrors({noEsMayor:true});
      }

    }

  }

  existeMarca(marcaControl:string ){
    return (formGroup: FormGroup) => {
      const marca = formGroup.controls[marcaControl];

      if (marca.value.nombre !== undefined) {
        marca.setErrors(null);
      } else {
        marca.setErrors({marcaNoSeleccionada: true});
      }      
    }
  }
  

}
