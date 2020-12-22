import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductoService } from 'src/app/admin-options/producto.service';
import { ValidadoresService } from 'src/app/log-in/services/validadores.service';
import { Producto } from 'src/app/products/clases/producto';
import { Sku } from 'src/app/products/clases/sku';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import Swal from 'sweetalert2';
import { Promocion } from '../../clases/promocion';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-form-promo-product',
  templateUrl: './form-promo-product.component.html',
  styleUrls: ['./form-promo-product.component.scss']
})
export class FormPromoProductComponent implements OnInit, OnDestroy {

  accion: string;

  algo: boolean;
  producto:Producto;
  productosASeleccionar:Producto[] = [];
  productosSeleccionados:Producto[] = [];
  infoFechaInicio = "Si no selecciona una fecha de inicio, por defecto será la actual.";
  filterProductos = "";

  sku:Sku;

  formProducto:FormGroup;

  date = new Date().toISOString().substring(0, 16);

  promocion:Promocion;

  suscripcion: Subscription;
  suscripcionSku: Subscription;

  constructor( private catalogoService: CatalogoService,
               private validadores: ValidadoresService,
               private fb:FormBuilder,
               private productoService: ProductoService,
               private dataService: DataService ) { }

  ngOnInit(): void {

    this.accion = "newPromoProduto";

    this.suscripcion = this.dataService.productoSelec$.subscribe(producto => {
      /* this.productosSeleccionados.push(producto) */
      this.producto = new Producto();
      this.producto = producto;
      
    });

    this.suscripcionSku = this.dataService.productoSkuSelec.subscribe(sku => {
      /* this.sku.push(sku) */
      this.sku = new Sku();
      this.sku = sku;
      this.accion = "newPromoSku";
    })



    /* this.obtenerProductos(); */
    this.crearFormularioPromProducto();
    this.cargarFechaDesde();
    this.promocion = new Promocion();
    this.algo = true;
    this.formProducto.get('porcentaje').setValidators([Validators.required, Validators.max(90), Validators.min(5)]);
    this.formProducto.get('precio').setValidators(null);

  };

  ngOnDestroy(): void {
  
    this.suscripcion.unsubscribe();
    this.suscripcionSku.unsubscribe();
    
  }

  crearFormularioPromProducto(){

    this.formProducto = this.fb.group({
      fechaDesde: [''],
      fechaHasta: ['', Validators.required],
      porcentaje: [''],
      precio: ['']
    },{
      validators: this.validadores.validarFechas('fechaDesde', 'fechaHasta')
    })

  };

  get fechaDesdeInvalida(){
    this.formProducto.setValidators([])
    return this.formProducto.get('fechaDesde');
  };

  get fechaHastaInvalida(){
    /* return this.formSubcategoria.get('fechaHasta').invalid && this.formSubcategoria.get('fechaHasta').touched; */
    const fechaDesde =  this.formProducto.get('fechaDesde').value;
    const fechaHasta =  this.formProducto.get('fechaHasta').value;

    if ( (new Date(fechaDesde).getTime() >= new Date(fechaHasta).getTime()) || this.formProducto.get('fechaHasta').invalid && this.formProducto.get('fechaHasta').touched ) {
      return true
    }else{
      return false
    }
  };

  get porcentajeInvalido(){
    return this.formProducto.get('porcentaje').invalid && this.formProducto.get('porcentaje').touched;
  };

  get precioInvalido(){
    return this.formProducto.get('precio').invalid && this.formProducto.get('precio').touched;
  };

  cargarFechaDesde(){
    this.formProducto.setValue({
      fechaDesde: this.date,
      fechaHasta: "",
      porcentaje: "",
      precio: ""
    })
  };

  crearPromocion(){

    console.log(this.formProducto, this.producto, this.sku);
    

    if (this.formProducto.invalid) {

      return Object.values( this.formProducto.controls ).forEach(control => {

       if (control instanceof FormGroup) {
         Object.values( control.controls ).forEach(control => control.markAsTouched());
       } else{
         control.markAsTouched();
       }
     });  
   }

    this.promocion.fechaDesde = this.formProducto.controls.fechaDesde.value + "-03:00";
    this.promocion.fechaHasta = this.formProducto.controls.fechaHasta.value + "-03:00";
    if (this.algo) {
      this.promocion.porcentaje = ( this.formProducto.controls.porcentaje.value / 100 );
    }else{
      this.promocion.precioOferta = this.formProducto.controls.precio.value;
    }
    
    

    console.log(this.promocion);

    if (this.accion === "newPromoProduto") {

      this.productoService.createNewPromotionProducto(this.promocion, this.producto.id).subscribe(resp => {
        console.log(resp);
        
      });
      this.alertaExito("¡Promocion creada con éxito!");
      return

    };

    if ( this.accion === "newPromoSku" ) {

      this.productoService.createNewPromotionSku(this.promocion, this.sku.id).subscribe(resp => {
        console.log(resp);
        
      })
      this.alertaExito("¡Promoción creada con éxito!")
      return;
    };

    

  };

  eliminarProducto(j:number){
    /* this.productosASeleccionar.push(this.productosSeleccionados[j]); */
    this.dataService.productoNo$.emit(this.productosSeleccionados[j]);
    /* this.productosSeleccionados.splice(j, 1); */
    
  };

  cerrarModal(){
    this.dataService.cerrarModal$.emit();
  };


  alertaExito(msj: string){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      text: msj,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1f4e84'
    }).then(result => {
      this.cerrarModal();
    })

  }

  precio(){

    this.algo = false;
    this.formProducto.get('porcentaje').setValidators(null);
    this.formProducto.get('porcentaje').setValue("");
    this.formProducto.get('precio').setValidators([Validators.required, Validators.min(0.1)]);

  };

  porcentaje(){

    this.algo = true;
    this.formProducto.get('precio').setValidators(null);
    this.formProducto.get('precio').setValue("");
    this.formProducto.get('porcentaje').setValidators([Validators.required, Validators.max(90), Validators.min(5)]);

  }


}
