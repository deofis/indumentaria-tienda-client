import { EventEmitter, Injectable } from '@angular/core';
import { Producto } from 'src/app/products/clases/producto';
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

  prodSelect$ = new EventEmitter<Producto>();

  constructor() { }
}
