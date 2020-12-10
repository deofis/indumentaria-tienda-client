import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { Marca } from 'src/app/products/clases/marca';
import { MarcasService } from '../marcas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-brands-panel',
  templateUrl: './brands-panel.component.html',
  styleUrls: ['./brands-panel.component.scss']
})
export class BrandsPanelComponent implements OnInit {

  brands: Marca[] = [];
  formMarca: FormGroup;
  newBrand: Marca;

  constructor( private router:Router,
               private authService: AuthService,
               private marcasService: MarcasService,
               private modalService: NgbModal,
               private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getBrands();
    this.newBrand = new Marca();
    this.crearFormulario();
    
  
  }

  getBrands(){
    this.marcasService.getBrands().subscribe((resp:any) => {
      this.brands = resp;
    })
  };

  openModal(longContent) {

    this.modalService.open(longContent, { scrollable: true, centered: true });
    
  };

  openModalModify(modifyContent){
    this.modalService.open(modifyContent, { scrollable: true, centered: true})
  }

  crearFormulario(){

    this.formMarca = this.fb.group({
      nombre: ['', Validators.required]
    });

  };

  get nombreNoValido(){
    return this.formMarca.get('nombre').invalid && this.formMarca.get('nombre').touched
  };

  crearMarca(){

    this.newBrand.nombre = this.formMarca.controls.nombre.value;
    console.log(this.newBrand);

    this.marcasService.createNewBrand(this.newBrand).subscribe((resp:any) => {
      console.log(resp);
    });

    this.formMarca.reset();
    
    
  };

}
