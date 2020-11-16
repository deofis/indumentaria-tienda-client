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
    private authService: AuthService,) {
  
  }

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
   arrowUp1.style.display="block"

}

hideDetail1(){
        ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
        let detail = document.getElementById("compra1") ;
        detail.style.display="none";
     
      ///// *** **** SUBRAYADO *** *** /////
      let border = document.getElementById("cont-compra1") ;
      border.style.borderBottom="none";
     
        ///// *** **** FLECHAS *** *** /////
      let arrowDown1=document.getElementById("down1")
       arrowDown1.style.display="block"
      
      let arrowUp1=document.getElementById("up1");
       arrowUp1.style.display="none"
}

    //// **** *** LATERAL MENU *** **** /////
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
}
