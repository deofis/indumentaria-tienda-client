import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../log-in/services/auth.service';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from '../../products/services/catalogo.service';
import { DataService } from './data.service';

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
               private router: Router,
               private dataService: DataService) { }

  ngOnInit(): void {

    this.arrow = true;
    this.obtenerProductos();

    this.dataService.cerrarModal$.subscribe(resp => {
      this.modalService.dismissAll();
    })

  }


  obtenerProductos(){
    this.catalogoService.getProductos().subscribe((resp:any) => {
      this.productos = resp;
      this.productosASeleccionar = resp;
    });
  };

  

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1 ;
  }

  //Modal nueva promoción

  open(contenido){

    this.modalService.open(contenido, { size: 'xl', scrollable: true});

  }
}

