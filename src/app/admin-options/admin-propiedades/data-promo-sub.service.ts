import { EventEmitter, Injectable } from '@angular/core';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { Subcategoria } from '../../products/clases/subcategoria';


@Injectable({
  providedIn: 'root'
})
export class DataPromoSubService {

  subSelect$ = new EventEmitter<Subcategoria>();
  editPropiedadSub$ = new EventEmitter<Subcategoria>();
  editPropiedad$ = new EventEmitter<PropiedadProducto>();
  cerrarModal$ = new EventEmitter();

  constructor() { }
}
