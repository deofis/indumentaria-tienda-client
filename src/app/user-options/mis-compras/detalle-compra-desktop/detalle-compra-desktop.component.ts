import { Component, Input, OnInit } from '@angular/core';
import { Operacion } from 'src/app/admin-options/admin-ventas/clases/Operacion';

@Component({
  selector: 'app-detalle-compra-desktop',
  templateUrl: './detalle-compra-desktop.component.html',
  styleUrls: ['./detalle-compra-desktop.component.scss']
})
export class DetalleCompraDesktopComponent implements OnInit {

  @Input () operacion: Operacion

  constructor() { }

  ngOnInit(): void {
  }

}
