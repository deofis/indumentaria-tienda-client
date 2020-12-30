import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { ValorPropiedadProducto } from 'src/app/products/clases/valor-propiedad-producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { PropiedadesService } from '../../propiedades.service';

import { DataPromoSubService } from '../data-promo-sub.service';


@Component({
  selector: 'app-tabla-promo-sub',
  templateUrl: './tabla-promo-sub.component.html',
  styleUrls: ['./tabla-promo-sub.component.scss']
})
export class TablaPromoSubComponent implements OnInit {

  subcategorias:Subcategoria[] = [];
  subSeleccionada:Subcategoria;

  constructor( private catalogoService: CatalogoService,
               private dataPromoSubService: DataPromoSubService ) { }

  ngOnInit(): void {

    this.obtenerSubcategorias();

  }


  obtenerSubcategorias(){

    this.catalogoService.getSubcategorias().subscribe((resp:any) => {
      this.subcategorias = resp;
      
    })
  };

  setSeleccion(sub: Subcategoria){
    /* this.subSeleccionada = sub; */
    this.dataPromoSubService.subSelect$.emit(sub);
  };

  filaSeleccionada(i:string){
    
    let filas = document.getElementById("filas");
    filas.style.backgroundColor = "white"
    let fila = document.getElementById(`fila${i}`);
    fila.style.backgroundColor = "red"
    console.log(filas.style.backgroundColor);
    
    console.log(fila.style.backgroundColor);
    
    
  }

}
