import { Component, OnInit } from '@angular/core';
import { MockCartService } from '../../services/mock-cart.service';
import { ItemCarrito } from '../../clases/item-carrito';
import { Carrito } from '../../clases/carrito';
import { CarritoService } from '../../services/carrito.service';
import { DetalleCarrito } from '../../clases/detalle-carrito';
import { AuthService } from '../../../log-in/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  carrito: Carrito;
  totalProductos: number;

  constructor(private carritoService: CarritoService, private _cartService:MockCartService, private authService: AuthService) {
    this.carrito = new Carrito();
    this.totalProductos = 0;
   }

  ngOnInit(): void {
    this.getCarrito();

    // this.items=JSON.parse(localStorage.getItem("Mi Carrito"));
    // console.log(this.items)

    // this._cartService.currentDataCart$.subscribe(x=>{
    //   if(x)
    //   {
    //     this.items = x;
    //     this.totalQuantity = x.length;
    //      this.totalPrice = x.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
        
    //   }
    // })
 
  }

  getCarrito(): void {
    if (this.authService.isLoggedIn()) {
      this.carritoService.getCarrito().subscribe((response: any) => {
        this.carrito = response.carrito;
        this.totalProductos = this.carrito.items.length;
      });
    }

    this.carrito = this._cartService.getCarrito();
    this.totalProductos = this.carrito.items.length;
    console.log(this.carrito);
  }

  eliminarItem(id: number): void {
    let productoId = id.toString();

    this.carrito.items = this.carrito.items.filter((item: ItemCarrito) => id !== item.producto.id);

    this.carritoService.eliminarItem(productoId).subscribe(response => {
      this.carrito = response.carritoActualizado;
    });
  }

  decrementarCantidad(item: DetalleCarrito): void {
    let productoId = item.producto.id;
    
    this.carrito.items = this.carrito.items.map((item: DetalleCarrito) => {
      if (productoId == item.producto.id) {
        --item.cantidad;
      };
      return item;
    });
    if (item.cantidad == 0) {
      return this.eliminarItem(productoId);
    }
    console.log(item.cantidad);

    this.carritoService.actualizarCantidad(item.cantidad.toString(), productoId.toString()).subscribe(response => {
      this.carrito = response.carritoActualizado;
    });
  }

  incrementarCantidad(item: DetalleCarrito): void {
    let productoId = item.producto.id;
    
    this.carrito.items = this.carrito.items.map((item: DetalleCarrito) => {
      if (productoId == item.producto.id) {
        ++item.cantidad;
      };
      return item;
    });

    console.log(item.cantidad);

    this.carritoService.actualizarCantidad(item.cantidad.toString(), productoId.toString()).subscribe(response => {
      this.carrito = response.carritoActualizado;
    });
  }


  /*
  ///inicio carrito de compras eliminar , sumar 
  // public remove(item:ItemCarrito){
  //   this._cartService.removeElementCart(item);
  // }
  // public  removeOne(item:ItemCarrito){
  //   this._cartService.removeOneElementCart(item)
  // }
  // public addOne(item:ItemCarrito){
  //   this._cartService.addOneElementCart(item)
  // }

//// fin carrito de compras eliminar sumar 


 closeIcon(){
  let icono=document.getElementById("close");
  icono.style.color="red"
 }
 */
}
