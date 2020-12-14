import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/log-in/services/auth.service';
import { Marca } from 'src/app/products/clases/marca';
import { MarcasService } from '../marcas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";




@Component({
  selector: 'app-brands-panel',
  templateUrl: './brands-panel.component.html',
  styleUrls: ['./brands-panel.component.scss']
})
export class BrandsPanelComponent implements OnInit {

  brands: Marca[] = [];
  formMarca: FormGroup;
  newBrand: Marca;
  modifyBrand: Marca;
  filterBrands = "";

  constructor( private router:Router,
               private authService: AuthService,
               private marcasService: MarcasService,
               private modalService: NgbModal,
               private fb: FormBuilder) { }

  ngOnInit(): void {

    this.getBrands();
    this.newBrand = new Marca();
    this.modifyBrand = new Marca();
    this.crearFormulario();
  
  }

  getBrands(){
    this.marcasService.getBrands().subscribe((resp:any) => {
      this.brands = resp;
    })
  };

  openModal(longContent) {

    this.modalService.open(longContent, { scrollable: true, centered: true, keyboard: false, backdrop:'static' });
    
  };

  openModalModify(modifyContent, brand: Marca){
    this.modifyBrand = brand;
    this.formMarca.setValue({
      nombre: this.modifyBrand.nombre
    })
    this.modalService.open(modifyContent, { scrollable: true, centered: true, keyboard: false, backdrop:'static'})
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

    if (this.formMarca.invalid) {

      return Object.values( this.formMarca.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       }else{
         control.markAsTouched();
       }
     });  
   };


    this.newBrand.nombre = this.formMarca.controls.nombre.value;
    console.log(this.newBrand);

    this.marcasService.createNewBrand(this.newBrand).subscribe((resp:any) => {
      console.log(resp);
      this.getBrands();
    });

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      text: "¡Nueva marca creada con éxito!",
      icon: 'success',
      confirmButtonText: 'Aceptar',
    })

    this.formMarca.reset();
    this.modalService.dismissAll();
    
    
    
  };

  modificarMarca(){


    if (this.formMarca.invalid) {

      return Object.values( this.formMarca.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       }else{
         control.markAsTouched();
       }
     });  
   };

    this.modifyBrand.nombre = this.formMarca.controls.nombre.value;
    console.log(this.modifyBrand);

    this.marcasService.modifyBrand(this.modifyBrand).subscribe((resp:any) =>{
      console.log(resp);
      this.getBrands();
    });


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
      },
      buttonsStyling: true
    });
    
    swalWithBootstrapButtons.fire({
      text: "¡Marca editada con éxito!",
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    
    this.formMarca.reset();
    this.modalService.dismissAll();
    

  };

}
