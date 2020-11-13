import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockCarrito } from 'src/app/cart/clases/cart';
import { ItemCarrito } from '../clases/item-carrito';
import { Producto } from 'src/app/products/clases/producto';
import { Carrito } from '../clases/carrito';
import { DetalleCarrito } from '../clases/detalle-carrito';

@Injectable({
  providedIn: 'root'
})
export class MockCartService {

  carrito: Carrito;

  constructor() {
    this.carrito = new Carrito();
  }

  agregarItem(producto: Producto) {
    let existeProducto: boolean;
    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    } else {
      this.carrito = new Carrito();
    }

    this.carrito.items.forEach(item => {
      if (item.producto.id === producto.id) {
        existeProducto = true;
        ++item.cantidad;
      } else {
        existeProducto = false;
      }
    });

    if (!existeProducto) {
      let item: DetalleCarrito = new DetalleCarrito();
      item.producto = producto;
      item.cantidad = 1;
      this.carrito.items.push(item);
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log(this.carrito);
  }

  getCarrito() {
    return JSON.parse(localStorage.getItem('carrito'));
  }
  /*
  private cart = new BehaviorSubject<Array<ItemCarrito>>(null); 
  public currentDataCart$ = this.cart.asObservable();
  carrito:MockCarrito;

  constructor() {
    this.carrito=new MockCarrito()
   }
  //**Esta función se encarga de recibir el item que debemos agregar al carrito, nos fijamos si ya existe aumentamos su cantidad, sino lo agregamos y volvemos a enviar el valor a todos los observers
  public changeCart(newData: ItemCarrito) {
    //Obtenemos el valor actual
    let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if(listCart) {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj.producto.id == newData.producto.id));

      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1)
      {
       listCart[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }  
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    localStorage.setItem("Mi Carrito",  JSON.stringify(listCart) );  
  
  }


   //REMOVER UN PROD DEL CARRITO y volvemos a envíar la lista de esos elementos para que se propague entre los observer
  public removeElementCart(newData:ItemCarrito){
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj.producto.id == newData.producto.id));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
       listCart[objIndex].cantidad =1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex,1);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    localStorage.setItem("Mi Carrito",  JSON.stringify(listCart) ); 
  }

  public removeOneElementCart(newData:ItemCarrito){
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj.producto.id == newData.producto.id));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
       listCart[objIndex].cantidad -=1;
      //Eliminamos el item del array del carrito
      // listCart.splice(objIndex,1);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
   
  }

  public addOneElementCart(newData:ItemCarrito){
    let listCart = JSON.parse(localStorage.getItem("Mi Carrito"));
    //Buscamos el item del carrito para agregar
    let objIndex = listCart.findIndex((obj => obj.producto.id == newData.producto.id));
   let item =listCart.find(x => x.producto.id == newData.producto.id)
   console.log(item)
   let array=JSON.parse(localStorage.getItem("Mi Carrito"))
    if(objIndex != -1)
    {
      //le agregar 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
       listCart[objIndex].cantidad +=1;
      //Eliminamos el item del array del carrito
      // listCart.splice(objIndex,1);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    
  }
 */
}
