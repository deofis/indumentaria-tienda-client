import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { Producto } from 'src/app/products/clases/producto';
import { EnviarProductoService } from '../enviar-producto.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  step2: boolean = false;
  subscripcionProducto: Subscription;
  newProduct: Producto;
  flag = false;

  constructor( private router:Router,
               private authService: AuthService,
               private modalService: NgbModal, 
               private enviarProducto: EnviarProductoService ) {  }

  ngOnInit(): void {

    this.subscripcionProducto = this.enviarProducto.enviarProducto$.subscribe(producto => {
      this.newProduct = new Producto();
      this.newProduct = producto;
      this.step2 = true;
    });

  }
  showDetail1(){

    ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
  let detail = document.getElementById("compra1") ;
    detail.style.display="block";
 
  ///// *** **** SUBRAYADO *** *** /////
  let border = document.getElementById("cont-compra1") ;
  border.style.borderBottom="1px solid rgb(221, 213, 213)";
 
    ///// *** **** FLECHAS *** *** /////
  let arrowDown1=document.getElementById("down1")
   arrowDown1.style.display="none"
  
  let arrowUp1=document.getElementById("up1");
   arrowUp1.style.display="block";

  };

hideDetail1() {
  ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
  let detail = document.getElementById("compra1") ;
  detail.style.display="none";
     
  ///// *** **** SUBRAYADO *** *** /////
  let border = document.getElementById("cont-compra1") ;
  border.style.borderBottom="none";
     
  ///// *** **** FLECHAS *** *** /////
  let arrowDown1=document.getElementById("down1");
  arrowDown1.style.display="block";
  let arrowUp1=document.getElementById("up1");
  arrowUp1.style.display="none";
  
  };


  open(contenido){
    
    this.modalService.open(contenido, { size: 'xl', scrollable: true});

  };

}
