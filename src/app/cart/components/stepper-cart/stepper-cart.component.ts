import { Direccion } from './../../../log-in/clases/cliente/direccion';
import { Operacion } from './../../../admin-options/admin-ventas/clases/Operacion';
import { EnviarInfoCompraService } from './../../../user-options/user-profile/services/enviar-info-compra.service';
import { Cliente } from './../../../log-in/clases/cliente/cliente';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stepper-cart',
  templateUrl: './stepper-cart.component.html',
  styleUrls: ['./stepper-cart.component.scss']
})
export class StepperCartComponent implements OnInit {
  clienteDireccion:any;
  pago:string;
  entrega:string;
  abriendoStep2:boolean;
  subscripcionInfoCompra : Subscription;

;
  constructor(private enviarInfoCompra:EnviarInfoCompraService) { }

  ngOnInit(): void {
    //// recibo del step 2 "checkout" la info cliente
    this.subscripcionInfoCompra=this.enviarInfoCompra.enviarCliente$.subscribe(dir=> {
       this.clienteDireccion=dir;
     })
    //// recibo del step 2 "checkout" la infoforma de entrega
    this.subscripcionInfoCompra=this.enviarInfoCompra.enviarEntrega$.subscribe(entrega=> {
       this.entrega=entrega;
     })
      //// recibo del step 2 "checkout" la info  forma de pago 
    this.subscripcionInfoCompra=this.enviarInfoCompra.enviarPago$.subscribe(pago=> {
       this.pago=pago;
     })
  }

}
