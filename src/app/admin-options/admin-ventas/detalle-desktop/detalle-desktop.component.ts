import { Component, Input, OnInit } from '@angular/core';
import { Operacion } from '../clases/Operacion';

@Component({
  selector: 'app-detalle-desktop',
  templateUrl: './detalle-desktop.component.html',
  styleUrls: ['./detalle-desktop.component.scss']
})
export class DetalleDesktopComponent implements OnInit {

  @Input () operacion: Operacion;

  constructor() { }

  ngOnInit(): void {
  }

}
