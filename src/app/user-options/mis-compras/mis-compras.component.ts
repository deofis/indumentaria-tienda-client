import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {
 compra1=[
   {id:"s6726s6d88",
   productos:[{nombre:"Samsung Galaxy S20",precio:25000,cantidad:1,color:"Negro"},
              {nombre:"Termo Stanley",precio:2600,cantidad:2,color:"Verde"}],
   fecha:"02/05/20",
   total:30200
  }]
 compra2=[
  {id:"s6792js8a8",
  productos:[{nombre:"Iphone 11",precio:240000,cantidad:1,color:"Blanco"},],
  fecha:"18/12/19",
  total:240000,
 }]
 compra3=[
 {id:"a23dg53fs8",
 productos:[{nombre:"Samsung Galaxy J2",precio:28600,cantidad:2,color:"Blanco"},],
 fecha:"05/02/18d",
 total:57200,
}]

compras=[this.compra1,this.compra2,this.compra3]
  constructor() {

   }

  ngOnInit(): void {
    console.log(this.compra1)
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
}
