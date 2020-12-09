import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor( private router:Router,
    private authService: AuthService,) {  }

  ngOnInit(): void {

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

  }

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
  
  }

}
