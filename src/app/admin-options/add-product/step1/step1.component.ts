import { PropiedadesService } from './../../propiedades.service';
import { PropiedadProducto } from './../../../products/clases/propiedad-producto';
import { ValidadoresService } from 'src/app/log-in/services/validadores.service';
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
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Output,EventEmitter } from '@angular/core';
import { DataService } from '../../admin-promos/data.service';
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  @Output() enviar= new EventEmitter();
  showForm2:boolean = false;
  showFormPromo:boolean=false;
  categorias:Categoria[];
  subcategorias: Subcategoria[];
  categoriaSeleccionada: Categoria;
  unidadSeleccionada:UnidadMedida;
  form:FormGroup;
  oferta:boolean=false;
  unidadesMedida:UnidadMedida[];
  step2:boolean=false;
  formPromo:boolean=false;
  //nombres para los select
  marca:string="-Marca-";
  categoria:string="-Categoría-";
  subcategoria:string="-Subcategoría-";
  unidad:string="-Unidad de Medida-";
  // file
  url:string;
 selectedFile:File=null; 
 
// autocomplete
  autoControl = new FormControl();
  marcas:Marca[];
  newBrand:Marca;
  filteredBrands:Observable<Marca[]>;
  newProduct:Producto;

 
  propiedadesProducto:PropiedadProducto[];  
  constructor( private router:Router,
                private http:HttpClient,
                private catalogoservice:CatalogoService,
                private fb:FormBuilder,
                public modal: NgbModal,
                private productoService:ProductoService,
                private validadores: ValidadoresService,
                private dataService:DataService,
                private propiedadesService:PropiedadesService,
                ) { 
                  this.marcas = [];
                  this.newProduct= new Producto();
                this.newBrand=new Marca();
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

  enviarProducto(){
    this.dataService.productoSelec$.emit(this.newProduct)
  }
/// *** ***  Formulario 1
crearProducto(){

  if (this.form.invalid){
    return this.form.markAllAsTouched();
  }
    this.newProduct.nombre=this.form.controls.nombre.value;
    this.newProduct.descripcion=this.form.controls.descripcion.value;
    this.newProduct.precio=this.form.controls.precio.value;
    this.newProduct.disponibilidadGeneral=this.form.controls.disponibilidadGeneral.value;
    this.newProduct.destacado=this.form.controls.destacado.value;
    this.newProduct.marca=this.form.controls.marca.value;
    this.newProduct.subcategoria=this.form.controls.subcategoria.value;
    this.newProduct.unidadMedida=this.form.controls.unidadMedida.value;
   //  this.newProduct.propiedades=this.form.controls.subcategoria.value.propiedades ;
 
   this.propiedadesProducto=this.form.controls.subcategoria.value.propiedades;
  

    this.productoService.createNewProduct(this.newProduct).subscribe( response => {
    console.log(response);
    this.newProduct.id=response.id;
    this.productoService.uploadPhoto(this.selectedFile, this.newProduct?.id).subscribe(response => console.log(response));
  //  for (let i = 0; i < this.propiedadesProducto.length; i++) {
  //   this.propiedadesService.crearNuevaPropiedadProducto(this.propiedadesProducto[i],this.newProduct.id).subscribe(response => console.log(response));
     
  //  }
   
    this.form.disable();
    let button1 = document.getElementById("btn-end1");
    button1.style.display="none";
    let button2 = document.getElementById("btn-end2");
    button2.style.display="none";
    let formPromocion=document.getElementById("form-promo");
    formPromocion.style.display="flex";
    this.deshabilitarInputFoto();
    
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
    disponibilidadGeneral:[null, Validators.required],
    destacado:[false],
    marca: ["", Validators.required],
    subcategoria:["", Validators.required],
    categoria:["",Validators.required],
    unidadMedida:["", Validators.required],
  }, {
    validators: this.validadores.existeMarca('marca')
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



  //// Upload imgs///////
  readUrl(event:any) {
    // console.log(event);
    this.selectedFile=event.target.files[0];
    // console.log(this.selectedFile)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      document.getElementById("img-ppal").style.display="block"
    }
}

  ///// *** *** STEP 1 **** *** ///
  showStep2(){
    let step1=document.getElementById("step1");
    step1.style.display="none";   
    this.step2=true;
  }

  deshabilitarInputFoto(){
    let inputFoto = document.getElementById("add-files") as HTMLInputElement;
    if (inputFoto.disabled) {
      
    }else{
      inputFoto.disabled=true
    }
  } 
  // cambiar botones al cambiar el estado del checkbox de promocion
  changeButtons(){
    let btn= document.getElementById("btn-end1");
    let btn2= document.getElementById("btn-end2");
    if ((document.getElementById("combinations")as HTMLInputElement).checked ||
      (document.getElementById("checkbox-oferta")as HTMLInputElement).checked ) {
        btn.style.display="none";
        btn2.style.display="block"
        if ((document.getElementById("combinations")as HTMLInputElement).checked) {
          this.showForm2=true;
          this.showFormPromo=false
        }
        if ((document.getElementById("checkbox-oferta")as HTMLInputElement).checked) {
          this.showForm2=false;
          this.showFormPromo=true
        }
        if ((document.getElementById("checkbox-oferta")as HTMLInputElement).checked && 
        (document.getElementById("combinations")as HTMLInputElement).checked){
          this.showForm2=false;
          this.showFormPromo=true
        }
    }else{
      alert("no combinacion")
      btn.style.display="block";
      btn2.style.display="none"
    }
  }
  mostrarSiguiente(){
    if (this.showForm2) {
      let step1=document.getElementById("step1");
      step1.style.display="none";   
      this.step2=true;
    }
    if (this.showFormPromo){
      this.formPromo=true;
    }
  }
  //cambiar botones al cambiar el estado del checkbox de tiene combinaciones
  changeButtons2(){
    let btn= document.getElementById("btn-promo1");
    let btn2= document.getElementById("btn-promo2");
    if(this.showForm2 == false){
      btn.style.display="none";
      btn2.style.display="block"
      this.showForm2=true;
    }else {
      btn.style.display="block";
      btn2.style.display="none";
      this.showForm2=false;
    }
  }
  
  private _filter(value:any) {
    const filterValue = value.toLowerCase();
    return this.marcas.filter(marca => marca.nombre.toLowerCase().indexOf(filterValue) === 0);
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
      });
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

      ///// MODAL  NUEVA MARCA////
  openCentrado(contenido){
    this.modal.open(contenido,{centered:true})
  }
  addBrand(){
   let input = document.getElementById("marca")as HTMLInputElement;
    //lleno el objeto marca
    if(input.value !== ""){
   this.newBrand.id=1;
   this.newBrand.nombre=input.value.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match) {
    return match.charAt(match.length-1).toUpperCase()});
   //lo envio
   this.catalogoservice.addBrand(this.newBrand)
   .subscribe( response => {
     this.getBrands();
     console.log(response)});
  
     //msj listo 
  let modal = document.getElementById("listo");
  modal.style.display="block";
  let form =document.getElementById("form-add-brand");
  form.style.display="none"
  let btn =document.getElementById("btn-brand");
  btn.style.display="none"
   }
  }
}
