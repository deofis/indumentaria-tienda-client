import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrarOperacionService } from '../../../services/registrar-operacion.service';


@Component({
  selector: 'app-fm-paypal-envio',
  templateUrl: './fm-paypal-envio.component.html',
  styleUrls: ['./fm-paypal-envio.component.scss']
})
export class FmPaypalEnvioComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private registrarNuevaOperacion:RegistrarOperacionService
                ) { }

  ngOnInit(): void {
    /// tomo el nro de operacion de la ruta y lo envio al servicio para completar el pago 
      this.activatedRoute.queryParams.subscribe( param=> {
        const nroOp= param?.nroOperacion ;
        this.registrarNuevaOperacion.completarPago(nroOp).subscribe(response => {
          console.log(response)
        })
      }) 
  }
}
