import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




import { Router } from '@angular/router';
import { AuthService } from '../../log-in/services/auth.service';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from '../../products/services/catalogo.service';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { Promocion } from '../admin-promos/clases/promocion';
import { ProductoService } from '../producto.service';




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


  constructor( private catalogoService: CatalogoService,
               private modalService: NgbModal,
               private fb:FormBuilder,
               private router:Router,
               private authService: AuthService) { }

  ngOnInit(): void {

    this.arrow = true;
    this.obtenerProductos();

  }

  

  
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


  //Funcionalidad menú lateral.
  showLateralMenu(){
    if (screen.width>800) {
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="200px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="block";
    let arrow= document.getElementById("botonMenu");
    arrow.style.display="none"
    } else{
     let lateralmenu=document.getElementById("lateralMenu");
     lateralmenu.style.opacity="0.9"
     lateralmenu.style.width="100%"
      let menu = document.getElementById("lateral-container");
       menu.style.display="block";
      let close = document.getElementById("close-menu");
      close.style.display="block";
      close.style.marginLeft="15px";
      close.style.fontSize="0.8em";
      let arrow = document.getElementById("open-menu");
      arrow.style.display="none"
    }
  }

  hiddeLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="30px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="none";
    let boton = document.getElementById("botonMenu");
    boton.style.display="block";
    let close = document.getElementById("close-menu");
    close.style.display="none";
    let arrow = document.getElementById("open-menu");
    arrow.style.display="block"
  }

  /**
   * Cerrar sesión y eliminar datos de la misma.
   */
  logout(): void {
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }


  //Modal nueva promoción

  open(contenido){

    this.modalService.open(contenido, { size: 'xl', scrollable: true});

  }
}

