import { ValorPropiedadProducto } from './../../../products/clases/valor-propiedad-producto';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { ProductoService } from '../../producto.service';
import { ActivatedRoute } from '@angular/router';
import { Sku } from 'src/app/products/clases/sku';
import {FormControl} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Producto } from 'src/app/products/clases/producto';
import { Input } from '@angular/core';
import { AuthService } from '../../../log-in/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  @Input() newProduct:Producto;
 properties:PropiedadProducto[];
 values:ValorPropiedadProducto [];
  oferta:boolean=false;
  propertyID:number;
  formSkus:FormGroup;
  newSku:Sku;
  propiedades:string="propiedad";
  seleccionados= new Array;
  opcionSeleccionado:any;
  valoresSelect:Array<any>;
  skus:Sku
  constructor(private productoService:ProductoService,
              private fb:FormBuilder,
              private router:Router,
               private authService: AuthService,
              private activatedroute:ActivatedRoute,
              public modal: NgbModal,) {
     this.newSku=new Sku();
   }

  ngOnInit(): void {
     
   this.getPropertiesOfSubcategory();
    this.crearForm();
    console.log(this.newProduct)
  }
 
  showLateralMenu(){
    if (screen.width>650) {
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="200px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="block";
    let arrow= document.getElementById("botonMenu");
    arrow.style.display="none"
    } else{
     let lateralmenu=document.getElementById("lateralMenu");
     lateralmenu.style.opacity="0.9"
     lateralmenu.style.width="100%"
      let menu = document.getElementById("lateral-container");
       menu.style.display="block";
      let close = document.getElementById("close-menu");
      close.style.display="block";
      close.style.marginLeft="15px";
      close.style.fontSize="0.8em";
      let arrow = document.getElementById("open-menu");
      arrow.style.display="none"
    }
  }
  hiddeLateralMenu(){
    let lateralmenu=document.getElementById("lateralMenu");
    lateralmenu.style.width="30px";
    let menu = document.getElementById("lateral-container");
    menu.style.display="none";
    let boton = document.getElementById("botonMenu");
    boton.style.display="block";
    let close = document.getElementById("close-menu");
    close.style.display="none";
    let arrow = document.getElementById("open-menu");
    arrow.style.display="block";
  }
  /**
   * Cerrar sesión y eliminar datos de la misma.
   */
  logout(): void {
    this.authService.logout();
    
    this.router.navigate(['/home']);
  }
  generateAutomaticsSkus(){
    this.productoService.generateSkus(2).subscribe( response => {
      
      this.productoService.getAllTheSkus(2).subscribe( response => 
        this.skus=response)})
    setTimeout(() => {
      document.getElementById("advertencia").style.display="block"
    }, 1000);
   
  }
  crearSku(){
    this.newSku.precio=this.formSkus.controls.precio.value;
    this.newSku.precioOferta=this.formSkus.controls.precioOferta.value;
    this.newSku.disponibilidad=this.formSkus.controls.disponibilidad.value;
    this.newSku.producto= this.newProduct;
    this.newSku.producto.propiedades=this.seleccionados;
    console.log(this.newSku);
    // crear nuevo sku
    this.productoService.createNewSku(this.newSku,this.newProduct.id).subscribe( response => {
      console.log(response);
      this.productoService.getAllTheSkus(this.newProduct.id).subscribe( response => 
      this.skus=response);
      
    });}
  
    
  crearForm(){
    this.formSkus=this.fb.group({
       id:[""],
       nombre:[""],
       descripcion:[""],
       precio:[null, Validators.required],
       precioOferta:[""],
       disponibilidad:[null, Validators.required],
       valoresData:[""],
      //  valores:this.fb.array([]),
       defaultProducto:[""],
       producto:[""],  
    });
   
  }
  // get valores(): FormArray{
  //   return this.formSkus.get('valores') as FormArray
  // }
  
  get precio(){
    return this.formSkus.get('precio')
  }
  get pcioOferta(){
    return this.formSkus.get('precioOferta')
  }
  get disponibilidad(){
    return this.formSkus.get('disponibilidad')
  }
  precioOferta(){
    let ofertaInput= document.getElementById("inputOfertaSku");
 
    if(this.oferta == false){
      ofertaInput.style.display="flex"
      this.oferta=true;
    }else {
      ofertaInput.style.display="none"
      this.oferta=false;
    }
  }
  addProperty(){
    
  }
  getPropertiesOfSubcategory(){
   
    this.productoService.getPropertiesOfSubcategory(this.newProduct?.subcategoria.id).subscribe((response: any) => {
      this.properties=response;
    })
  }

  guardarValores(){   
     this.seleccionados.push(this.opcionSeleccionado)
       console.log(this.seleccionados)
    }


  ///// MODAL ////
  openCentrado(contenido){
    this.modal.open(contenido,{centered:true})
  }


}
