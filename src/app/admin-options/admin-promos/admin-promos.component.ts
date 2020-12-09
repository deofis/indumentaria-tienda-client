import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
/* import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'; */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../log-in/services/auth.service';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from '../../products/services/catalogo.service';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { Promocion } from '../admin-promos/clases/promocion';
import { ProductoService } from '../producto.service';
import { ValidadoresService } from 'src/app/log-in/services/validadores.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'app-admin-promos',
  templateUrl: './admin-promos.component.html',
  styleUrls: ['./admin-promos.component.scss']
})
export class AdminPromosComponent implements OnInit {

  productos:Producto[] = [];
  productosASeleccionar:Producto[] = [];
  productosSeleccionados:Producto[] = [];
  page_size: number = 10;
  page_number:number = 1;
  pageSizeOptions = [10, 20, 50]
  value = 'Ejemplo: Galaxy';
  arrow:boolean;
  filterPromos ='';


  filterSubcategorias="";
  subcategorias:Subcategoria[] = [];
  subASeleccionar:Subcategoria[] = [];
  subSeleccionadas:Subcategoria[] = [];
  infoFechaInicio = "Si no selecciona una fecha de inicio, por defecto será la actual."
  

  promociones: Promocion;
  formSubcategoria: FormGroup;

  date = new Date().toISOString().substring(0, 16)/* split(':')[0]; */

  constructor( private catalogoService: CatalogoService,
               private modalService: NgbModal,
               private calendar: NgbCalendar,
               private fb:FormBuilder,
               private productoService: ProductoService,
               private validadores: ValidadoresService,
               private router:Router,
               private authService: AuthService) { }

  ngOnInit(): void {

    this.arrow = true;
    this.obtenerProductos();
    this.obetenerSubcategorias();
    this.crearFormularioPromSubcategoria();
    this.cargarFechaDesde();
    console.log(this.date);
    this.promociones = new Promocion();
    
    
  }

  //Funcionalidades para crear una nueva promocion segun subcategorias -- INICIO --
  crearFormularioPromSubcategoria(){

    this.formSubcategoria = this.fb.group({
      fechaDesde: [''],
      fechaHasta: ['', [Validators.required] ],
      porcentaje: ['', [Validators.required, Validators.max(90), Validators.min(5) ] ]
    })
  };

  get fechaDesdeInvalida(){
    return this.formSubcategoria.get('fechaDesde');
  }

  get fechaHastaInvalida(){
    return this.formSubcategoria.get('fechaHasta').invalid && this.formSubcategoria.get('fechaHasta').touched;
  }
  get porcentajeInvalido(){
    return this.formSubcategoria.get('porcentaje').invalid && this.formSubcategoria.get('porcentaje').touched;
  }

  cargarFechaDesde(){
    this.formSubcategoria.setValue({
      fechaDesde: this.date,
      fechaHasta: "",
      porcentaje: ""
    })
  };

  crearPromocion(){

    if (this.formSubcategoria.invalid) {

      return Object.values( this.formSubcategoria.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       }else{
         control.markAsTouched();
       }
     });  
   }
    
    
    this.promociones.fechaDesde = this.formSubcategoria.controls.fechaDesde.value + "-03:00";
    this.promociones.fechaHasta = this.formSubcategoria.controls.fechaHasta.value + "-03:00";
    this.promociones.porcentaje = ( this.formSubcategoria.controls.porcentaje.value / 100 );

    console.log(this.promociones);

    if (this.subSeleccionadas.length > 1) {

      for (let index = 0; index < this.subSeleccionadas.length; index++) {
        
        this.productoService.crearNewPromotionSub(this.promociones, this.subSeleccionadas[index].id).subscribe(resp => {
          console.log(resp);
          
        })  
      }
      
    }else{
      this.productoService.crearNewPromotionSub(this.promociones, this.subSeleccionadas[0].id).subscribe(resp => {
        console.log(resp);
        
      })
    }

    
    this.catalogoService.getSubcategorias().subscribe((resp:any) =>{
      this.subcategorias = resp;
      this.subASeleccionar = resp;    
      
    })
    this.subSeleccionadas = [];

    this.formSubcategoria.reset();       
    
  }

  obetenerSubcategorias(){
    this.catalogoService.getSubcategorias().subscribe((resp:any) =>{
      this.subcategorias = resp;
      this.subASeleccionar = resp;    
      
    })
  }

  anadirSub(i:number){

    this.subSeleccionadas.push(this.subASeleccionar[i]);
    this.subASeleccionar.splice(i, 1); 
    
  }

  eliminarSub(j:number){
    this.subASeleccionar.push(this.subSeleccionadas[j]);
    this.subSeleccionadas.splice(j, 1);
  }

  reiniciar(){
    this.catalogoService.getSubcategorias().subscribe((resp:any) =>{
      this.subcategorias = resp;
      this.subASeleccionar = resp;    
      
    })
    this.subSeleccionadas = [];
    this.formSubcategoria.reset();  
    
  }

  // -- FINAL -- //

  
// Funcionalidades para crear una nueva promocion segun producto -- INICIO -- //

/* crearFormularioPromProducto(){

  this.formSubcategoria = this.fb.group({
    fechaDesde: [''],
    fechaHasta: ['', [Validators.required] ],
    precioOferta: [''],
    porcentaje: ['', [Validators.required, Validators.max(90), Validators.min(5) ] ]
  })
}; */

  obtenerProductos(){
    this.catalogoService.getProductos().subscribe((resp:any) => {
      this.productos = resp;
      this.productosASeleccionar = resp;
    });
  };

  anadirProducto(i:number){

    this.productosSeleccionados.push(this.productosASeleccionar[i]);
    this.productosASeleccionar.splice(i, 1); 
    
  }

  eliminarProducto(j:number){
    this.productosASeleccionar.push(this.productosSeleccionados[j]);
    this.productosSeleccionados.splice(j, 1);
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1 ;
  }

  //Modal nueva promoción

  open(contenido){

    this.modalService.open(contenido, { size: 'xl', scrollable: true});

  }
}

