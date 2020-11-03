import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/products/clases/categoria';
import { Producto } from '../../clases/producto';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productosDestacados: Producto[];
  target: HTMLInputElement;
   categorias:Categoria[];
  

tarjeta= document.querySelectorAll(".tarjetas")
cantidadPaginas= Math.ceil(this.tarjeta.length /5);
  constructor(private catalogoService:CatalogoService) { 

  }
  ngOnInit(): void {
    /// ****  *** CARUSEL PRODUCTOS DESTACADOS *** ****  ///
    const fila=document.getElementById("contenedor-carouselDestacados");
    const flecha1= document.getElementById("flecha-izquierda-fila1");
     const flecha2= document.getElementById("flecha-derecha-fila1");
     flecha2.addEventListener("click",()=>{
       fila.scrollLeft += fila.offsetWidth;
     })
     flecha1.addEventListener("click",()=>{
      fila.scrollLeft -= fila.offsetWidth;
    })
/// ****  *** CARUSEL OFERTAS *** ****  ///
const fila2=document.getElementById("contenedor-carouselOfertas");
    const flecha3= document.getElementById("flecha-izquierda-fila2");
     const flecha4= document.getElementById("flecha-derecha-fila2");
     flecha4.addEventListener("click",()=>{
       fila2.scrollLeft += fila2.offsetWidth;
     })
     flecha3.addEventListener("click",()=>{
      fila2.scrollLeft -= fila2.offsetWidth;
    })

    /// EFECTO CATEGORIAS
    

  
    this.getProductosDestacados();
   
     this.getListaCategorias();
     this.paginacion();
    window.addEventListener("scroll",this.showCategoriesEffect);
  }
//// mostar categorias
showCategoriesEffect() {
  let animado= document.querySelectorAll(".card-c");
  let scrollTop= document.documentElement.scrollTop;
  for ( var i=0; i< animado.length; i++){
    let alturaAnimado= (animado[i] as HTMLElement).offsetTop;
    if(alturaAnimado-450<scrollTop){
      (animado[i] as HTMLElement).style.opacity="1";
      (animado[i] as HTMLElement).classList.add("animacion")
    }
  }
}

///// PAGINACION ARREGLAR 
  paginacion(){
    const fila=document.getElementById("contenedor-carouselDestacados");
    for (let i = 0; i < this.cantidadPaginas; i++) {
     const indicador = document.createElement("button");

     if(i===0){
       indicador.classList.add("activo");
     }
     document.querySelector(".indicadores").appendChild(indicador);
     indicador.addEventListener("click",(e)=> {
     fila.scrollLeft= i* fila.offsetWidth;
     document.querySelector(".indicadores .activo").classList.remove("activo");
    //  e.target.classList.add("activo)
     })
      
    }
  }
  getProductosDestacados():void{
    this.catalogoService.getProductosDestacados().subscribe(response => {
      this.productosDestacados=response;
      console.log(this.productosDestacados)}
      );
  }



    /***** get Categories *****/
    getListaCategorias():void{
      this.catalogoService.getListaCategorias().subscribe( response =>{
       this.categorias=response;
       console.log(response) }
       )
    }

  /**** Hidde/ show functions ****/
  hiddeButtonsO(){
    const carouselButtons = document.querySelectorAll('.ofertas');
    carouselButtons[0].classList.add("mostrar");
    carouselButtons[1].classList.add("mostrar");
  
  }
  showButtonsO(){
    const carouselButtons = document.querySelectorAll('.ofertas');
    carouselButtons[0].classList.remove("mostrar");
    carouselButtons[1].classList.remove("mostrar");
  } 
  hiddeButtonsF(){
    const carouselButtons = document.querySelectorAll('.featured');
    carouselButtons[0].classList.add("mostrar");
    carouselButtons[1].classList.add("mostrar");
  }
  showButtonsF(){
    const carouselButtons = document.querySelectorAll('.featured');
    carouselButtons[0].classList.remove("mostrar");
    carouselButtons[1].classList.remove("mostrar");
  }
  hiddeButtonsC(){
    const carouselButton1 = document.getElementById('previousCategories');
    carouselButton1.classList.add("mostrar");
    const carouselButton2 = document.getElementById('nextCategories');
    carouselButton2.classList.add("mostrar");
  }
  showButtonsC(){
    const carouselButton1 = document.getElementById('previousCategories');
    carouselButton1.classList.remove("mostrar");
    const carouselButton2 = document.getElementById('nextCategories');
    carouselButton2.classList.remove("mostrar");
  }
  /**** End of hidde/ show functions ****/
  



}
