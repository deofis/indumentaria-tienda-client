import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {
 constructor( private router:Router,
              private authService: AuthService,) {

   }

  ngOnInit(): void {
  }
  //// **** *** LATERAL MENU *** **** /////
  showLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="200px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="block";
    let arrow= document.getElementById("openMenu");
    arrow.style.display="none"
  }
  hiddeLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="30px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="none";
    let arrow= document.getElementById("openMenu");
    arrow.style.display="block"
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

showDetail2(){

  ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
let detail = document.getElementById("compra2") ;
  detail.style.display="block";

///// *** **** SUBRAYADO *** *** /////
let border = document.getElementById("cont-compra2") ;
border.style.borderBottom="1px solid rgb(221, 213, 213)";

  ///// *** **** FLECHAS *** *** /////
let arrowDown2=document.getElementById("down2")
 arrowDown2.style.display="none"

let arrowUp2=document.getElementById("up2");
 arrowUp2.style.display="block"

}

hideDetail2(){
      ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
      let detail = document.getElementById("compra2") ;
      detail.style.display="none";
   
    ///// *** **** SUBRAYADO *** *** /////
    let border = document.getElementById("cont-compra2") ;
    border.style.borderBottom="none";
   
      ///// *** **** FLECHAS *** *** /////
    let arrowDown1=document.getElementById("down2")
     arrowDown1.style.display="block"
    
    let arrowUp1=document.getElementById("up2");
     arrowUp1.style.display="none"
}

  /**
   * Cerrar sesión y eliminar datos de la misma.
   */
  logout(): void {
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }
}
