import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { Categoria } from 'src/app/products/clases/categoria';
import { Router } from '@angular/router';
import { Subcategoria } from 'src/app/products/clases/subcategoria';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Marca } from 'src/app/products/clases/marca';
import { UnidadMedida } from 'src/app/products/clases/unidad-medida';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { Producto } from 'src/app/products/clases/producto';
import { ProductoService } from '../../producto.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  showForm2:boolean = false;
  categorias:Categoria[];
  subcategorias: Subcategoria[];
  categoriaSeleccionada: Categoria;
  unidadSeleccionada:UnidadMedida;
  form:FormGroup;
  oferta:boolean=false;
  unidadesMedida:UnidadMedida[];
  //nombres para los select
  marca:string="-Marca-";
  categoria:string="-Categoría-";
  subcategoria:string="-Subcategoría-";
  unidad:string="-Unidad de Medida-";

  // autocomplete
  autoControl = new FormControl();
  marcas:Marca[];
  filteredBrands:Observable<Marca[]>;
  newProduct:Producto;
  constructor( private router:Router,
                private catalogoservice:CatalogoService,
                private fb:FormBuilder,
                private productoService:ProductoService) { 
                  this.marcas = [];
                  this.newProduct= new Producto();
                
                }

  ngOnInit(): void {
         ///inicializar el fomulario
         this.crearForm();
         this.getUnidades();
         // get category list 
        this.getListaCategorias();
        // get brands
        this.getBrands();

        this.filteredBrands = this.form.controls.marca.valueChanges.pipe(
        startWith(''),
         map(value => {
           return this._filter(value)
          })
        );
      
  }

  mostrarNombre(marca?: Marca): string | undefined {
    return marca? marca.nombre: undefined;
  }
/// *** ***  Formularios
crearProducto(){
  if (this.form.invalid){
    return this.form.markAllAsTouched();
  }
  this.newProduct.nombre=this.form.controls.nombre.value;
  this.newProduct.descripcion=this.form.controls.descripcion.value;
  this.newProduct.precio=this.form.controls.precio.value;
  this.newProduct.precioOferta=this.form.controls.precioOferta.value;
  this.newProduct.disponibilidadGeneral=this.form.controls.disponibilidadGeneral.value;
  this.newProduct.destacado=this.form.controls.destacado.value;
  this.newProduct.marca=this.form.controls.marca.value;
  this.newProduct.subcategoria=this.form.controls.subcategoria.value;
  this.newProduct.unidadMedida=this.form.controls.unidadMedida.value;

 
  this.productoService.createNewProduct(this.newProduct).subscribe( response => {
    console.log(response);
    let dataProductoNuevo = response;
    Swal.fire({
      icon:"success",
      title:"Producto creado",
      text: `El producto ${response.nombre} ha sido creado con éxito!`
    });
    this.form.disable();
  }, err => {
    console.log(err);
  });
}
crearForm(){
  this.form=this.fb.group({
    id:[""],
    nombre:["", Validators.required],
    descripcion:[""],
    precio:["", Validators.required],
    precioOferta:[""],
    disponibilidadGeneral:[0],
    destacado:[false],
    marca: ["", Validators.required],
    subcategoria:["", Validators.required],
    categoria:["",Validators.required],
    unidadMedida:["", Validators.required],
    combinations:[false],
    checkoferta:[false],

  });
}

  // Getters para campos invalidos formulario 
  get nombreInvalido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
    get marcaInvalida() {
      return this.form.get('marca').invalid && this.form.get('marca').touched;
    }
    get subcategoriaInvalida() {
      return this.form.get('subcategoria').touched  && (this.form.controls.subcategoria.value == this.subcategoria);
    }
    get categoriaInvalida() {
      return this.form.get('categoria').touched && (this.form.controls.categoria.value == this.categoria);
    }
    get unidadInvalida() {
      return this.form.get('unidadMedida').touched && this.form.get('unidadMedida').value==this.unidad;
    }
    get precioInvalido() {
      return this.form.get('precio').invalid && this.form.get('precio').touched;
    }

  ///// *** *** STEP 1 **** *** ///
  showStep2(){
    let step2= document.getElementById("step2");
    let step1=document.getElementById("step1");
    if(this.showForm2 == true && this.form.valid){
      step2.style.display="block";
      step1.style.display="none";
      document.getElementById("btn-one").style.display="none";
      document.getElementById("btn-two").style.display="block";
      this.showForm2=false;
    }else {
      step2.style.display="none";
      step1.style.display="block";
    }
  }
  hasCombinations(){
    let button= document.getElementById("btn-one");
    if(this.showForm2 == false){
      button.innerText="Guardar y Continuar"
      this.showForm2=true;
    }else {
      button.innerText="Guardar y Finalizar"
      this.showForm2=false;
    }
  }
  precioOferta(){
    let ofertaInput= document.getElementById("inputOferta");
    if(this.oferta == false){
      ofertaInput.style.display="flex"
      this.oferta=true;
    }else {
      ofertaInput.style.display="none"
      this.oferta=false;
    }
  }
  
  private _filter(value:any) {
    return this.marcas.filter(marca => marca.nombre.toLowerCase().indexOf(value) === 0);
  }
  
     /***** GET CATEGORIES *****/
     getListaCategorias():void{
      this.catalogoservice.getListaCategorias().subscribe( response =>{
       this.categorias=response;
      }
       )
    }

    getUnidades(){
      this.catalogoservice.getUnidades().subscribe(response => {
        this.unidadesMedida=response;
      })
    }
    getBrands(){
      this.catalogoservice.getBrands().subscribe((response: any) => {
        this.marcas=response.marcas;
      })
    }

    showSubcategories(){
      this.categoriaSeleccionada = this.form.controls.categoria.value;
     
      this.catalogoservice.getSubcategoriasPorCategoria(this.categoriaSeleccionada.id)
      .subscribe(response => {
        this.subcategorias=response.subcategorias;
      })

      let comboBoxSubcateories= document.getElementById("subcategories");
      comboBoxSubcateories.style.display="block";
    }
    showUnit(){
       this.unidadSeleccionada = this.form.controls.unidadMedida.value;
     
      let unidad = document.getElementById("unidadElegida");
      
      if(this.unidadSeleccionada.nombre=="Unidad"){
        unidad.innerText="unidades";
      }
      if(this.unidadSeleccionada.nombre=="Kilo"){
        unidad.innerText="kilos"
      }
      if(this.unidadSeleccionada.nombre=="Litro"){
        unidad.innerText="litros"
      }
           
    }
    changeUnit(){
      let inputDisponibilidad= document.getElementById("availability") as HTMLInputElement;
      let unidad = document.getElementById("unidadElegida");
      this.unidadSeleccionada = this.form.controls.unidadMedida.value;
      if(inputDisponibilidad.value== "1"){
       unidad.innerText=this.unidadSeleccionada.nombre
      }else{
        this.showUnit();
      }
    }
}
