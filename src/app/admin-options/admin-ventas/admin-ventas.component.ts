import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../log-in/services/auth.service';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { VentasService } from '../ventas.service';
import { Operacion } from './clases/Operacion';

// import { SortEvent } from 'primeng/api';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-ventas',
  templateUrl: './admin-ventas.component.html',
  styleUrls: ['./admin-ventas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminVentasComponent implements OnInit {

  ventas:Operacion[] = [];
  cols: any[];
  loading: boolean = true;

  columnsToDisplay = ['id', 'cliente.nombre', 'direccion', 'fechaOperacion', 'fechaEnvio', 'fechaEntrega', 'estado', 'total'];
  expandedElement: Operacion | null;

  isTableExpanded = false;
  data = new MatTableDataSource();

  constructor( private router:Router,
               private authService: AuthService,
               private ventasServices:  VentasService ) { }

  ngOnInit(): void {
    
    this,this.obtenerVentas();
    
    
    
  }


  obtenerVentas(){
    this.ventasServices.getVentas().subscribe((resp:any) => {
      this.ventas = resp;
      this.data.data = this.ventas
      console.log(this.ventas);
      this.loading = false;
    })
  }
    


  

  



}
