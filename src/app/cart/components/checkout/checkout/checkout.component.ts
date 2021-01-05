import { MedioPago } from './../../../../admin-options/admin-ventas/clases/MedioPago';
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
import { Input } from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy{
  @Input() abriendoStep2:boolean;
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
  mediosDePago:MedioPago[];
  // direccionEnvio:Direccion;
  clienteDireccion:any;
  entrega:string;
  pago:MedioPago;
  constructor(private carritoService: CarritoService,
              private fb:FormBuilder,
              private authService: AuthService,
              private Router:Router,
              private enviarInfoCompra:EnviarInfoCompraService,
              private catalogoservice:CatalogoService,
              ) { 
            this.carrito = new Carrito();
            this.pago = new MedioPago();
  }

  ngOnInit(): void {
  
    ///inicializar el fomulario
    this.crearForm(); 
    this.getPaises();  
    this.showAdress();
    this.getCarrito(); 
    this.getMediosDePago();

    // let efvo = document.getElementById("EFECTIVO") as HTMLInputElement;
    // efvo.checked=true;
  
    
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

  /// este método se activa cuando elijo la opción de envío a domicilio ,
  // me muestra el form para completar la dirección y oculta el método de pago efvo
  showInputAdress(){
    this.envioADomicilio=true
    this.costoDeEnvio=200;
    // let paypal = document.getElementById("PAYPAL") as HTMLInputElement;
    // paypal.checked=true;
    // let efvo= document.getElementById("EFECTIVO") as HTMLInputElement;
    // efvo.checked=false;
    // this.formEntrega.get("formaDePago").setValue("Paypal")

  }

  /// muestro la direccion del local cuando eligen la opcion de retiro personalmente
  showAdress(){
    //cambio los validadores  de los campos de direccion de envio para q no sean obligatorios
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

    // let paypal = document.getElementById("PAYPAL") as HTMLInputElement;
    // if (paypal!== null) {
    //   paypal.checked=false
    // }
    
  }
  // para obtener todos los medios de pago
   
  getMediosDePago(){
    this.carritoService.getMediosDePago().subscribe((response: any) => {
      this.mediosDePago=response.mediosPago;
    });
  }
   /// para el medio de pago elegido 
  getMedioDePago(id:number){
    this.carritoService.getMedioDePago(id).subscribe((response: any) => {
      this.pago=response.medioPago;
      console.log(this.pago)
    });
  }
  guardarDatos(){

    if (this.formEntrega.invalid){
      return this.formEntrega.markAllAsTouched();
    }
    /// guardo las vriables con la info que voy a enviar al siguiente paso : direccion, forma de entrega y de pago 

    this.clienteDireccion=this.formEntrega.controls.direccion.value
    this.entrega=this.formEntrega.controls.formaDeEntrega?.value;
    let idPago =this.formEntrega.controls.formaDePago?.value;
    this.getMedioDePago(idPago);
     
    // this.formEntrega.disable();
    console.log(this.formEntrega)
  }
  
  crearForm(){
    this.formEntrega=this.fb.group({
      formaDePago:["",Validators.required],
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
  
  /// msotrar estados una vez que elegi el pais 
  showEstados(){
     this.paisSeleccionado = this.formEntrega.get('direccion.pais').value;
     this.catalogoservice.getEstados(this.paisSeleccionado?.id).subscribe( response =>{
      this.estados=response;
     })

    let comboBoxEstados= document.getElementById("combobox-estados");
    comboBoxEstados.style.display="block";
  }
  /// mostrar ciudades una vez que elegi estado 
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
  
    this.enviarInfoCompra.enviarCliente$.emit(this.clienteDireccion);
    this.enviarInfoCompra.enviarEntrega$.emit(this.entrega);
    this.enviarInfoCompra.enviarPago$.emit(this.pago);
  }, 600);
 
}

/**  para ver que imagen mostrar en los metodos de pago */
 imgPayPal(i){
  if (i+1 == 2) {
    return true
  } else{
    return false
  }
 }
 imgEfvo(i){
  if (i+1 == 1) {
    return true
  }else{
    return false
  }
 }

  }
