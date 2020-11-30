import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



import { Router } from '@angular/router';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from '../../products/services/catalogo.service';
import { Subcategoria } from 'src/app/products/clases/subcategoria';

/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'app-admin-promos',
  templateUrl: './admin-promos.component.html',
  styleUrls: ['./admin-promos.component.scss']
})
export class AdminPromosComponent implements OnInit {

  productosEnProm:Producto[] = [];
  page_size: number = 10;
  page_number:number = 1;
  pageSizeOptions = [10, 20, 50]
  value = 'Ejemplo: Galaxy';
  arrow:boolean;
  filterPromos ='';
  filterSubcategorias="";

  subcategorias:Subcategoria[] = [];





  constructor( private catalogoService: CatalogoService,
               private modalService: NgbModal ) { }

  ngOnInit(): void {

    this.arrow = true;
    this.obtenerProductosEnPromo();
    this.obetenerSubcategorias();
    

    //this.dataSource = new MatTableDataSource(this.productosEnProm);
    
    
  }

  


  obtenerProductosEnPromo(){
    this.catalogoService.getProductos().subscribe((resp:any) => {
      this.productosEnProm = resp;
      
    });
  };

  obetenerSubcategorias(){
    this.catalogoService.getSubcategorias().subscribe((resp:any) =>{
      this.subcategorias = resp;
      
      
    })
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1 ;
  }



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


  //Modal nueva promoción

  open(contenido){

    this.modalService.open(contenido, { size: 'xl' });

  }



}

