import { Cliente } from './../../../../log-in/clases/cliente/cliente';
import { Direccion } from './../../../../log-in/clases/cliente/direccion';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';
import { CarritoService } from '../../../services/carrito.service';
import { DetalleCarrito } from '../../../clases/detalle-carrito';
import { AuthService } from '../../../../log-in/services/auth.service';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/cart/clases/carrito';
import {FormControl} from '@angular/forms';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Pais } from 'src/app/log-in/clases/cliente/pais';
import { Estado } from 'src/app/log-in/clases/cliente/estado';
import { Ciudad } from 'src/app/log-in/clases/cliente/ciudad';
import { EnviarInfoCompraService } from 'src/app/user-options/user-profile/services/enviar-info-compra.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy{

  carrito: Carrito;
  totalProductos: number;
  totalPrice:number ;
  totalQuantity:number;
  costoDeEnvio:number=0;

  formEntrega:FormGroup;
  envioADomicilio:boolean = false;
  paises:Pais[];
  estados:Estado[];
  ciudades:Ciudad[];
  paisSeleccionado:Pais;
  // direccionEnvio:Direccion;
  cliente:Cliente;
  entrega:string;
  pago:string
  constructor(private carritoService: CarritoService,
              private fb:FormBuilder,
              private authService: AuthService,
              private Router:Router,
              private enviarInfoCompra:EnviarInfoCompraService,
              private catalogoservice:CatalogoService,
              ) { 
            this.carrito = new Carrito();
  }

  ngOnInit(): void {
    this.getCarrito();   
    ///inicializar el fomulario
    this.crearForm(); 
    this.getPaises();  
    this.showAdress();
  }
  ngOnDestroy():void{
    console.log("enviando datos")
  }
  

  getCarrito(): void {
    if (this.authService.isLoggedIn()) {
      this.carritoService.getCarrito().subscribe((response: any) => {
        this.carrito = response.carrito;
        this.totalProductos = this.carrito.items.length;
      });
    }
    
  }

  showInputAdress(){
    this.envioADomicilio=true
    this.costoDeEnvio=200;
    let paypal = document.getElementById("paypal") as HTMLInputElement;
    paypal.checked=true

  }
  showAdress(){
    this.formEntrega.get('direccion.calle').setValidators(null);
    this.formEntrega.get('direccion.nro').setValidators(null);
    this.formEntrega.get('direccion.cp').setValidators(null);
    this.formEntrega.get('direccion.ciudad').setValidators(null);
    this.formEntrega.get('direccion.pais').setValidators(null);
    this.formEntrega.get('direccion.estado').setValidators(null);
    this.formEntrega.get('direccion.calle').setValue("");
    this.formEntrega.get('direccion.nro').setValue("");
    this.formEntrega.get('direccion.cp').setValue("");
    this.formEntrega.get('direccion.ciudad').setValue("");
    this.formEntrega.get('direccion.pais').setValue("");
    this.formEntrega.get('direccion.estado').setValue("");
 
    this.envioADomicilio=false;
    this.costoDeEnvio=0;

    let paypal = document.getElementById("paypal") as HTMLInputElement;
    if (paypal!== null) {
      paypal.checked=false
    }
    
  }

  guardarDatos(){

    if (this.formEntrega.invalid){
      return this.formEntrega.markAllAsTouched();
    }
     this.cliente=this.formEntrega.controls.direccion.value
    this.entrega=this.formEntrega.controls.formaDeEntrega?.value;
    this.pago=this.formEntrega.controls.formaDePago?.value;
    console.log(this.entrega);
    console.log(this.pago);
    console.log(this.cliente)

     
    this.formEntrega.disable();
    console.log(this.formEntrega)
    }
  
  crearForm(){
    this.formEntrega=this.fb.group({
      formaDePago:["Efectivo", Validators.required],
      formaDeEntrega:["Retiro personalmente", Validators.required],
      direccion: this.fb.group({
          ciudad:["", Validators.required],
          pais:["", Validators.required],
          estado:[""],
          calle:["", Validators.required],
          nro:["", Validators.required],
          piso:[""],
          cp:["", Validators.required],
          })
      })
    }

    get calleInvalida() {
      return this.formEntrega.get('direccion.calle').invalid && this.formEntrega.get('direccion.calle').touched;
    }
    get nroInvalido() {
      return this.formEntrega.get('direccion.nro').invalid && this.formEntrega.get('direccion.nro').touched;
    }
    get cpInvalido() {
      return this.formEntrega.get('direccion.cp').invalid && this.formEntrega.get('direccion.cp').touched;
    }
    get ciudadInvalida() {
      return this.formEntrega.get('direccion.ciudad').invalid && this.formEntrega.get('direccion.ciudad').touched;
    }
    get paisInvalido() {
      return this.formEntrega.get('direccion.pais').invalid && this.formEntrega.get('direccion.pais').touched;
    }
    get estadoInvalido() {
      return this.formEntrega.get('direccion.estado').invalid && this.formEntrega.get('direccion.estado').touched;
    }
   

      ///////// obtener paises, estado ciudad ////
  getPaises(){
    this.catalogoservice.getPaises().subscribe( response =>{
      this.paises=response;
     })
  }
  
  
  showEstados(){
     this.paisSeleccionado = this.formEntrega.get('direccion.pais').value;
     this.catalogoservice.getEstados(this.paisSeleccionado?.id).subscribe( response =>{
      this.estados=response;
     })

    let comboBoxEstados= document.getElementById("combobox-estados");
    comboBoxEstados.style.display="block";
  }
  showCiudades(){
    let estadoSeleccionado = this.formEntrega.get('direccion.estado').value;
    
    this.catalogoservice.getCiudades(estadoSeleccionado?.id, this.paisSeleccionado.id).subscribe( response =>{
     this.ciudades=response;
    })

   let comboBoxEstados= document.getElementById("combobox-ciudades");
   comboBoxEstados.style.display="block";
 }


 enviarInfoAConfirmData(){
  setTimeout(() => {
    this.enviarInfoCompra.enviarCliente$.emit(this.cliente);
    this.enviarInfoCompra.enviarEntrega$.emit(this.entrega);
    this.enviarInfoCompra.enviarPago$.emit(this.pago);
  }, 100);
 
}

  }
