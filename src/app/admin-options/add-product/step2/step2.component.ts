import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { ValorPropiedadProducto } from 'src/app/products/clases/valor-propiedad-producto';
import { ProductoService } from '../../producto.service';
import { ActivatedRoute } from '@angular/router';
import { Sku } from 'src/app/products/clases/sku';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
 properties:PropiedadProducto[];
 values:ValorPropiedadProducto [];
  oferta:boolean=false;
  propertyID:number;
  formSkus:FormGroup;
  newSku:Sku;
  propiedades:string="propiedad";
  constructor(private productoService:ProductoService,
              private fb:FormBuilder,
              private activatedroute:ActivatedRoute,) {
     this.newSku=new Sku();
   }

  ngOnInit(): void {
    this.getPropertiesOfSubcategory();
    this.crearForm();
  }
 
  crearSku(){
    this.newSku.precio=this.formSkus.controls.precio.value;
   this.newSku.precioOferta=this.formSkus.controls.precioOferta.value;
   this.newSku.disponibilidad=this.formSkus.controls.disponibilidad.value;
   this.newSku.valores=this.formSkus.controls.valores.value;
   console.log(this.newSku);

   this.productoService.createNewSku(this.newSku,1).subscribe( response => 
    console.log(response))
  }
  crearForm(){
    this.formSkus=this.fb.group({
       id:[""],
       nombre:[""],
       descripcion:[""],
       precio:[""],
       precioOferta:[""],
       disponibilidad:[""],
       valoresData:[""],
       valores:[""],
       defaultProducto:[""],
       producto:[""],  
    });
  }
  get valores(){
    return this.formSkus.get('valores')
  }
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
    // this.activatedroute.params.subscribe(param=> {
    //   let subcategory= param.id;
    this.productoService.getPropertiesOfSubcategory(1).subscribe((response: any) => {
      this.properties=response;
    })
  }

}