import { Component, OnInit } from '@angular/core';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';
import { CarritoService } from '../../../services/carrito.service';
import { DetalleCarrito } from '../../../clases/detalle-carrito';
import { AuthService } from '../../../../log-in/services/auth.service';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/cart/clases/carrito';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carrito: Carrito;
  totalProductos: number;
  totalPrice:number ;
  totalQuantity:number;
  
  constructor(private carritoService: CarritoService,
              private authService: AuthService,
              private Router:Router,) { 
            this.carrito = new Carrito();
  }

  ngOnInit(): void {
    this.getCarrito();
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
  getCarrito(): void {
    if (this.authService.isLoggedIn()) {
      this.carritoService.getCarrito().subscribe((response: any) => {
        this.carrito = response.carrito;
        this.totalProductos = this.carrito.items.length;
      });
    }
    setTimeout(() => {
      console.log(this.carrito)
      console.log(this.totalProductos);
    }, 1000);
    
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
