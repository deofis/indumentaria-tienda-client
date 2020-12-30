import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/products/clases/categoria';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { PropiedadesService } from '../propiedades.service';
import { DataPromoSubService } from './data-promo-sub.service';

@Component({
  selector: 'app-admin-propiedades',
  templateUrl: './admin-propiedades.component.html',
  styleUrls: ['./admin-propiedades.component.scss']
})
export class AdminPropiedadesComponent implements OnInit, OnDestroy {

  arrow: boolean;
  categorias: Categoria[] = [];
  cerrarModal: Subscription


  constructor( private propiedadesService: PropiedadesService,
               private modalService: NgbModal,
               private dataPromoSubsService: DataPromoSubService) { }

  ngOnInit(): void {

    this.obtenerCategorias();
    this.arrow = true;

    this.cerrarModal = this.dataPromoSubsService.cerrarModal$.subscribe(resp => {
      this.obtenerCategorias();
      this.modalService.dismissAll();
    })
    
    
  };

  ngOnDestroy(): void {
    
    this.cerrarModal.unsubscribe();

  }


  obtenerCategorias(){
    this.propiedadesService.obetenerCategorias().subscribe((resp:any) => {
      this.categorias = resp;
      console.log(this.categorias);
    });
  };

  openModalNuevaProp(contenido){

    this.modalService.open(contenido, { size: 'xl', scrollable: true, keyboard: false, backdrop:'static'});

  };

  openModalEditProp(contenido){
    this.modalService.open(contenido, { size: 'lg', scrollable: true, keyboard: false, backdrop:'static'});
  };

  editar(sub: Subcategoria, prop: PropiedadProducto){

    
    setTimeout(() => {
      this.dataPromoSubsService.subSelect$.emit(sub);
      this.dataPromoSubsService.editPropiedad$.emit(prop);
    }, 100);
  }

  arrowIcono(i:string){
    let icono = document.getElementById(i);
    if (this.arrow) {
      icono.className = "fas fa-angle-up fa-lg mr-2";
      this.arrow = false;
    }else{
      icono.className = "fas fa-angle-down fa-lg mr-2";
      this.arrow = true;
    }
  }

}
