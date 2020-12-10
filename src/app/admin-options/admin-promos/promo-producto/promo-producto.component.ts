import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CatalogoService } from '../../../products/services/catalogo.service';
import { Promocion } from '../clases/promocion';
import { Producto } from 'src/app/products/clases/producto';
import { ValidadoresService } from 'src/app/log-in/services/validadores.service';
import { ProductoService } from '../../producto.service';

@Component({
  selector: 'app-promo-producto',
  templateUrl: './promo-producto.component.html',
  styleUrls: ['./promo-producto.component.scss']
})
export class PromoProductoComponent implements OnInit {

  productos:Producto[] = [];
  productosASeleccionar:Producto[] = [];
  productosSeleccionados:Producto[] = [];
  infoFechaInicio = "Si no selecciona una fecha de inicio, por defecto será la actual.";
  filterProductos = "";

  formProducto:FormGroup;

  date = new Date().toISOString().substring(0, 16);

  promocion:Promocion;

  constructor( private catalogoService: CatalogoService,
               private validadores: ValidadoresService,
               private fb:FormBuilder,
               private productoService: ProductoService ) { }

  ngOnInit(): void {

    this.obtenerProductos();
    this.crearFormularioPromProducto();
    this.cargarFechaDesde();
    this.promocion = new Promocion();

  }


  crearFormularioPromProducto(){

    this.formProducto = this.fb.group({
      fechaDesde: [''],
      fechaHasta: ['', Validators.required],
      porcentaje: ['', [Validators.required, Validators.max(90), Validators.min(5)]],
    },{
      validators: this.validadores.validarFechas('fechaDesde', 'fechaHasta')
    })

  };

  get fechaDesdeInvalida(){
    return this.formProducto.get('fechaDesde');
  };

  get fechaHastaInvalida(){
    /* return this.formSubcategoria.get('fechaHasta').invalid && this.formSubcategoria.get('fechaHasta').touched; */
    const fechaDesde =  this.formProducto.get('fechaDesde').value;
    const fechaHasta =  this.formProducto.get('fechaHasta').value;

    if ( (new Date(fechaDesde).getTime() >= new Date(fechaHasta).getTime()) || this.formProducto.get('fechaHasta').invalid && this.formProducto.get('fechaHasta').touched ) {
      return true
    }else{
      return false
    }
  };

  get porcentajeInvalido(){
    return this.formProducto.get('porcentaje').invalid && this.formProducto.get('porcentaje').touched;
  };

  cargarFechaDesde(){
    this.formProducto.setValue({
      fechaDesde: this.date,
      fechaHasta: "",
      porcentaje: ""
    })
  };

  crearPromocion(){

    if (this.formProducto.invalid) {

      return Object.values( this.formProducto.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       } else{
         control.markAsTouched();
       }
     });  
   }

    this.promocion.fechaDesde = this.formProducto.controls.fechaDesde.value + "-03:00";
    this.promocion.fechaHasta = this.formProducto.controls.fechaHasta.value + "-03:00";
    this.promocion.porcentaje = ( this.formProducto.controls.porcentaje.value / 100 );

    console.log(this.formProducto, this.promocion);

    if (this.productosSeleccionados.length > 1) {
      
      for (let index = 0; index < this.productosSeleccionados.length; index++) {
        
        this.productoService.createNewPromotionProducto(this.promocion, this.productosSeleccionados[index].id).subscribe(resp => {
          console.log(resp);
          
        })

        
      }

    } else {
      this.productoService.createNewPromotionProducto(this.promocion, this.productosSeleccionados[0].id).subscribe(resp => {
        console.log(resp);
        
      })
      
    };

    this.obtenerProductos();
    this.productosSeleccionados = [];

    this.cargarFechaDesde();
    this.formProducto.reset();
    

  };

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

}
