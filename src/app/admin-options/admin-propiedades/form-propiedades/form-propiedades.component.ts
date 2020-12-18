import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { ValorPropiedadProducto } from 'src/app/products/clases/valor-propiedad-producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { PropiedadesService } from '../../propiedades.service';
import Swal from "sweetalert2";

import { DataPromoSubService } from '../data-promo-sub.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-propiedades',
  templateUrl: './form-propiedades.component.html',
  styleUrls: ['./form-propiedades.component.scss']
})
export class FormPropiedadesComponent implements OnInit, AfterViewInit, OnDestroy {

  accion:string;

  botonesEditarProm = true;

  subSeleccionada:Subcategoria;

  formPropiedad: FormGroup;

  propiedad: PropiedadProducto;
  valoresPropiedad: ValorPropiedadProducto;

  infoNombre = "Ingrese el nombre que tendrá la nueva propiedad.";
  infoValores = "Puede crear una propiedad sin asignarle uno a más valores.";

  tablaValores: boolean;

  suscripcionSub: Subscription;
  suscripcionProm: Subscription;

  constructor( private fb:FormBuilder,
               private dataPromoSubService: DataPromoSubService,
               private propiedadesService: PropiedadesService) { }

  ngOnInit(): void {

    
    this.accion = "nuevaProp"
    this.subSeleccionada = new Subcategoria();
    this.propiedad = new PropiedadProducto();
    this.valoresPropiedad = new ValorPropiedadProducto();
    this.crearFormNuevaPromocion();
    this.tablaValores = false;

  };

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.suscripcionSub = this.dataPromoSubService.subSelect$.subscribe(sub => {
      this.subSeleccionada = sub;
      console.log(this.subSeleccionada);
      
    });

    this.suscripcionProm = this.dataPromoSubService.editPropiedad$.subscribe(prop => {
      this.tablaValores = true;
      this.propiedad = prop;
      this.cargarPropAEditar(this.propiedad);
      this.accion = "editProp"
      this.botonesEditarProm = false;
    });

  }

  ngOnDestroy(): void {
    
    this.suscripcionSub.unsubscribe();
    this.suscripcionProm.unsubscribe();
    
  }


  crearFormNuevaPromocion(){
    
    this.formPropiedad = this.fb.group({
      nombre: ['', Validators.required],
      valores: this.fb.array([])
    })

  };

  get nombreInvalido(){
    return this.formPropiedad.get('nombre').invalid && this.formPropiedad.get('nombre').touched;
  };

  get valoresInvalidos(){
    return this.formPropiedad.get('valores').invalid && this.formPropiedad.get('valores').touched;
  }

  get valores(){
    return this.formPropiedad.get('valores') as FormArray;
  };


  crearPropiedad(){

    if (this.formPropiedad.invalid) {

      return Object.values( this.formPropiedad.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       }else{
         control.markAsTouched();
       }
     });
   };
    
    this.propiedad.nombre =  this.formPropiedad.controls.nombre.value;
    this.propiedad.valores = [];

    /* Propenso a cambiar */
    this.propiedad.variable = true;
    
    if (this.valores.length) {
      
      for (let i = 0; i < this.valores.length; i++) {
        

        let valorPropiedad: ValorPropiedadProducto;
        valorPropiedad = new ValorPropiedadProducto;
        valorPropiedad.valor = this.formPropiedad.controls.valores.value[i];
        this.propiedad.valores.push(valorPropiedad);
          
      };

    };

    if (this.accion === "nuevaProp") {
      this.propiedadesService.crearNuevaPropiedadSubcategoria(this.propiedad, this.subSeleccionada.id).subscribe((resp:any) => {
        console.log(resp);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: true
        });
        
        swalWithBootstrapButtons.fire({
          text: "¡Nueva propiedad creada con éxito!",
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.dataPromoSubService.cerrarModal$.emit();
        
      });
    }
    
    if (this.accion ==="editProp") {
      this.propiedadesService.modificarPropiedad(this.propiedad, this.propiedad.id).subscribe((resp:any) => {
        console.log(resp);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: true
        });
        
        swalWithBootstrapButtons.fire({
          text: "¡Propiedad editada con éxito",
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.dataPromoSubService.cerrarModal$.emit();
      })
    }
    /* this.formPropiedad.reset();
    this.ocultarTabla(); */
    
    
  };

  agregarValor(){
    this.valores.push(this.fb.control('', Validators.required))
  };

  borrarValor(i:number){
    this.valores.removeAt(i);
  };

  mostrarTabla(){
    this.tablaValores = true;
  };

  ocultarTabla(){
    this.tablaValores = false;
    this.valores.clear();
  };

  cargarPropAEditar(prop: PropiedadProducto){

    let valors = prop.valores

    for (let i = 0; i < valors.length; i++) {
      
      this.valores.push(this.fb.control(valors[i].valor, Validators.required))
      
    }
  
    this.formPropiedad.patchValue({
      nombre: prop.nombre
    })
  }


}
