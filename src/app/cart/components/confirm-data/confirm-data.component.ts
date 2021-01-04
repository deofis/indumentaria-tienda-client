import { MedioPago } from './../../../admin-options/admin-ventas/clases/MedioPago';
import { Direccion } from './../../../log-in/clases/cliente/direccion';
import { DetalleOperacion } from './../../../admin-options/admin-ventas/clases/DetalleOperacion';
import { Cliente } from './../../../log-in/clases/cliente/cliente';
import { PerfilClienteService } from './../../../user-options/user-profile/services/perfil-cliente.service';
import { Component, OnInit } from '@angular/core';
import { Carrito } from '../../clases/carrito';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { EnviarInfoCompraService } from 'src/app/user-options/user-profile/services/enviar-info-compra.service';
import { Input } from '@angular/core';
import { Operacion } from 'src/app/admin-options/admin-ventas/clases/Operacion';
import { DetalleCarrito } from '../../clases/detalle-carrito';
@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {
  @Input() clienteDireccion:any;
  @Input() entrega:string;
  @Input() pago:string;
  infoCliente:any;
  carrito: Carrito;
  costoDeEnvio:number=200;
 
  
  // lo que envio al back
  operacion:Operacion;
  items:DetalleOperacion[];
  item:DetalleOperacion ;
  constructor(private perfilClienteService:PerfilClienteService,
              private authService: AuthService,
              private enviarInfoCompra:EnviarInfoCompraService,
              private carritoService: CarritoService,) {
                this.item = new DetalleOperacion();
                this.items = new Array<DetalleOperacion>();
                this.operacion = new Operacion();
               }

  ngOnInit(): void {
      this.getPerfilCliente(); 
      this.getCarrito();  
     }

  /// traigo la info del cliente loggeado (nombre,mail,telefono,direccion...)
getPerfilCliente():void{
  this.perfilClienteService.getInfoPerfilCliente().subscribe(response => {
  this.infoCliente=response;
  
  });
}

getCarrito(): void {
  if (this.authService.isLoggedIn()) {
    this.carritoService.getCarrito().subscribe((response: any) => {
      this.carrito = response.carrito;
    
    });
  }
}
//// metodos para mostrasr u ocultar la direccion de envio y la de entrega
tieneDireccEnvio(){
  if (this.entrega=="Envío a domicilio") {
    return true
  }
}
mostrarDireccLocal(){
  if (this.entrega=="Retiro personalmente") {
    return true
  }
}

/// metodos para validar que se haya elegido 
irAPagar(){
  /*** lleno el objeto operacio con  */

  /// infoCliente
  this.operacion.cliente=this.infoCliente;
  /// direccion de envio
  let direccion =new Direccion();
  direccion.calle=this.clienteDireccion?.calle;
  direccion.ciudad=this.clienteDireccion?.ciudad;
  direccion.codigoPostal=this.clienteDireccion?.cp;
  direccion.numeroCalle=this.clienteDireccion?.nro;
  direccion.piso=this.clienteDireccion?.piso;
  this.operacion.direccionEnvio=direccion
  /// total 
  this.operacion.total=this.carrito.total;
  /// items
  for (let i = 0; i < this.carrito.items.length; i++) {
    
    this.item.sku=this.carrito.items[i].sku;
    this.item.cantidad=this.carrito.items[i].cantidad;
    this.item.id=this.carrito.items[i].id;
    if (this.carrito.items[i].sku.promocion !== null && this.carrito.items[i].sku.promocion  !== undefined ) {
     this.item.precioVenta=this.carrito.items[i].sku.promocion.precioOferta
    }else{
     this.item.precioVenta=this.carrito.items[i].sku.precio
    }
    this.item.subtotal=this.carrito.items[i].subtotal
  
   this.items.push(this.item)
   this.operacion.items=this.items
   }

  /// medio de pago 



    console.log(this.operacion)
}
}
