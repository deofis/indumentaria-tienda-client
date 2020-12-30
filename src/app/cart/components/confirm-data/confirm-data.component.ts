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
  infoCliente:Cliente[];
  carrito: Carrito;
  costoDeEnvio:number=200

  constructor(private perfilClienteService:PerfilClienteService,
              private authService: AuthService,
              private enviarInfoCompra:EnviarInfoCompraService,
              private carritoService: CarritoService,) { }

  ngOnInit(): void {
      this.getPerfilCliente(); 
       this.getCarrito();   
      
  }

getPerfilCliente():void{
  this.perfilClienteService.getInfoPerfilCliente().subscribe(response => {
    console.log(response);
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

}
