import { EventEmitter, Injectable } from '@angular/core';
import { Subcategoria } from '../../products/clases/subcategoria';


@Injectable({
  providedIn: 'root'
})
export class DataPromoSubService {

  subSelect$ = new EventEmitter<Subcategoria>();

  constructor() { }
}
