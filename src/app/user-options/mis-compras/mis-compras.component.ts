import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.scss']
})
export class MisComprasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="200px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="block";
  }
  hiddeLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="30px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="none";
  }
  showDetail(){

      ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
    let detail = document.getElementsByClassName("row2") as HTMLCollectionOf<HTMLElement> ;
    console.log(detail)
    for (let i = 0; i < detail.length; i++) {
      detail[i].style.display="block";
    }

    ///// *** **** SUBRAYADO *** *** /////
    let border = document.getElementsByClassName("row1") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < detail.length; i++) {
    border[i].style.borderBottom="1px solid rgb(221, 213, 213)";
    }

      ///// *** **** FLECHAS *** *** /////
    let arrowDown=document.getElementsByClassName("fa-angle-down") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < detail.length; i++) {
     arrowDown[i].style.display="none"
    }
    let arrowUp=document.getElementsByClassName("fa-angle-up") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < detail.length; i++) {
     arrowUp[i].style.display="block"
    }
  }

  hideDetail(){
     ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
     let detail = document.getElementsByClassName("row2") as HTMLCollectionOf<HTMLElement> ;
     console.log(detail)
     for (let i = 0; i < detail.length; i++) {
       detail[i].style.display="none";
     }
 
     ///// *** **** SUBRAYADO *** *** /////
     let border = document.getElementsByClassName("row1") as HTMLCollectionOf<HTMLElement>;
     for (let i = 0; i < detail.length; i++) {
     border[i].style.borderBottom="none";
     }
 
       ///// *** **** FLECHAS *** *** /////
     let arrowDown=document.getElementsByClassName("fa-angle-down") as HTMLCollectionOf<HTMLElement>;
     for (let i = 0; i < detail.length; i++) {
      arrowDown[i].style.display="block"
     }
     let arrowUp=document.getElementsByClassName("fa-angle-up") as HTMLCollectionOf<HTMLElement>;
     for (let i = 0; i < detail.length; i++) {
      arrowUp[i].style.display="none"
     }
  }

}
