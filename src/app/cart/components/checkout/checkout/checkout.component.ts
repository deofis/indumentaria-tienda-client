import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/cart/clases/carrito';
import { ItemCarrito } from 'src/app/cart/clases/item-carrito';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: Array<ItemCarrito>;
  totalPrice:number ;
  totalQuantity:number;
  carrito:Carrito;
  constructor(private _cartService:MockCartService) { 
    this.carrito=new Carrito();
    this.items=[]
  }

  ngOnInit(): void {

    /*
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
         this.totalPrice = x.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
        
      }
      
    })
    */
  }
  showInputAdress(){
    let newAdress= document.getElementById("newAdress12");
    newAdress.style.display="inherit";
    let ourAdress= document.getElementById("ourAdress");
    ourAdress.style.display="none";
  }
  showAdress(){
    let ourAdress= document.getElementById("ourAdress");
    ourAdress.style.display="inherit";
    let newAdress= document.getElementById("newAdress12");
    newAdress.style.display="none";
    let cash= document.getElementById("cash-box");
    cash.style.display="inherit";
  }
  
}
