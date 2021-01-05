import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/cart/clases/carrito';
import { CarritoService } from 'src/app/cart/services/carrito.service';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-carrito',
  templateUrl: './resumen-carrito.component.html',
  styleUrls: ['./resumen-carrito.component.scss']
})
export class ResumenCarritoComponent implements OnInit {
  carrito: Carrito;
  totalProductos: number;
  totalPrice:number ;
  totalQuantity:number;
  constructor(private carritoService: CarritoService,
              private authService: AuthService,
              private Router:Router, ) {
      this.carrito = new Carrito();
     }

  ngOnInit(): void {
    this.getCarrito(); 
  }
  getCarrito(): void {
    if (this.authService.isLoggedIn()) {
      this.carritoService.getCarrito().subscribe((response: any) => {
        this.carrito = response.carrito;
        this.totalProductos = this.carrito.items.length;
      });
    }
  }

}
