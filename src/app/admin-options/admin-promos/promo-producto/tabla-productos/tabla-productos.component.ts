import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.scss']
})
export class TablaProductosComponent implements OnInit, OnDestroy {

  productos:Producto[] = [];
  productosASeleccionar:Producto[] = [];
  /* productosSeleccionados:Producto[] = []; */
  filterProductos = "";

  suscripcionProducto: Subscription;
  suscripcionObtenerProductos: Subscription;

  constructor( private catalogoService: CatalogoService,
               private dataService: DataService ) { }

  ngOnInit(): void {

    
    this.obtenerProductos();
    
    this.suscripcionProducto = this.dataService.productoNo$.subscribe(producto => {
      this.productosASeleccionar.push(producto)
    });

    this.suscripcionObtenerProductos = this.dataService.promocionado$.subscribe(resp => {
      this.obtenerProductos();
    })

  };

  ngOnDestroy(): void {

    this.suscripcionProducto.unsubscribe();
    this.suscripcionObtenerProductos.unsubscribe();

  }

  obtenerProductos(){
    this.catalogoService.getProductos().subscribe((resp:any) => {
      this.productos = resp;
      this.productosASeleccionar = resp;
    });
  };

  anadirProducto(i:number){

    /* this.productosSeleccionados.push(this.productosASeleccionar[i]); */
    this.dataService.productoSelec$.emit(this.productosASeleccionar[i]);
    this.productosASeleccionar.splice(i, 1);
    
    
    
  }

  /* eliminarProducto(j:number){
    this.productosASeleccionar.push(this.productosSeleccionados[j]);
    this.productosSeleccionados.splice(j, 1);
  } */

}
