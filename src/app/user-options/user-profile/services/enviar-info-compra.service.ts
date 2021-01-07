
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarInfoCompraService {
  enviarCliente$ = new EventEmitter();
  enviarEntrega$= new EventEmitter();
  enviarPago$ =new EventEmitter();
  enviarRecargarCarrito$ = new EventEmitter();
  enviarMostrarCheckout$ =new EventEmitter();
  enviarMostrarConfirmacion$ =new EventEmitter();
  constructor() { }
}