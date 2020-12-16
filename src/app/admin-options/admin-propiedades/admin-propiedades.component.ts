import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/products/clases/categoria';
import { PropiedadesService } from '../propiedades.service';

@Component({
  selector: 'app-admin-propiedades',
  templateUrl: './admin-propiedades.component.html',
  styleUrls: ['./admin-propiedades.component.scss']
})
export class AdminPropiedadesComponent implements OnInit {

  categorias: Categoria[] = [];


  constructor( private propiedadesService: PropiedadesService,
               private modalService: NgbModal) { }

  ngOnInit(): void {

    this.obtenerCategorias();
    
    
  }


  obtenerCategorias(){
    this.propiedadesService.obetenerCategorias().subscribe((resp:any) => {
      this.categorias = resp;
      console.log(this.categorias);
    });
  };

  open(contenido){

    this.modalService.open(contenido, { size: 'xl', scrollable: true});

  }

}
