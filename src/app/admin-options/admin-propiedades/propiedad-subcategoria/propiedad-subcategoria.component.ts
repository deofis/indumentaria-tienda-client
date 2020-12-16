import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import { ValorPropiedadProducto } from 'src/app/products/clases/valor-propiedad-producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { PropiedadesService } from '../../propiedades.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-propiedad-subcategoria',
  templateUrl: './propiedad-subcategoria.component.html',
  styleUrls: ['./propiedad-subcategoria.component.scss']
})
export class PropiedadSubcategoriaComponent implements OnInit {

  subcategorias:Subcategoria[] = [];
  subSeleccionada:Subcategoria;

  formPropiedad: FormGroup;

  propiedad: PropiedadProducto;
  valoresPropiedad: ValorPropiedadProducto;

  infoNombre = "Ingrese el nombre que tendrá la nueva propiedad.";
  infoValores = "Puede crear una propiedad sin asignarle uno a más valores.";

  tablaValores: boolean;

  constructor( private fb:FormBuilder,
               private catalogoService: CatalogoService,
               private propiedadesService: PropiedadesService ) { }

  ngOnInit(): void {

    this.subSeleccionada = new Subcategoria();
    this.propiedad = new PropiedadProducto();
    this.valoresPropiedad = new ValorPropiedadProducto()
    this.obtenerSubcategorias();
    this.crearFormNuevaPromocion();
    this.tablaValores = false;

  };

  obtenerSubcategorias(){
    this.catalogoService.getSubcategorias().subscribe((resp:any) => {
      this.subcategorias = resp;
      console.log(this.subcategorias);
      
    })
  };

  setSeleccion(sub: Subcategoria){
    this.subSeleccionada = sub;
  };

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
    /* this.propiedadesService.crearNuevaPropiedadSubcategoria(this.propiedad, this.subSeleccionada.id).subscribe((resp:any) => {
      console.log(resp);
      
    }); */

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

    this.formPropiedad.reset();
    this.ocultarTabla();
    

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

}
