import { Cliente } from './../../../log-in/clases/cliente/cliente';
import { PerfilClienteService } from './../../../user-options/user-profile/services/perfil-cliente.service';
import { Component, OnInit } from '@angular/core';
import { Carrito } from '../../clases/carrito';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { EnviarInfoCompraService } from 'src/app/user-options/user-profile/services/enviar-info-compra.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-confirm-data',
  templateUrl: './confirm-data.component.html',
  styleUrls: ['./confirm-data.component.scss']
})
export class ConfirmDataComponent implements OnInit {
  @Input() cliente:Cliente;
  @Input() entrega:string;
  @Input() pago:string;
  infoCliente:any;
  carrito: Carrito;
  costoDeEnvio:number=200;

  constructor(private perfilClienteService:PerfilClienteService,
              private authService: AuthService,
              private enviarInfoCompra:EnviarInfoCompraService,
              private carritoService: CarritoService,) { }

  ngOnInit(): void {
      this.getPerfilCliente(); 
       this.getCarrito();  
            
  }

  /// traigo la info del cliente loggeado (nombre,mail,telefono,direccion...)
getPerfilCliente():void{
  this.perfilClienteService.getInfoPerfilCliente().subscribe(response => {
    this.infoCliente=response
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
alert("yendo a paypal")
}
}
