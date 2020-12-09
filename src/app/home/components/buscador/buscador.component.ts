import { Producto } from './../../../products/clases/producto';
import { Subcategoria } from './../../../products/clases/subcategoria';
import { Marca } from './../../../products/clases/marca';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { zipAll } from 'rxjs-compat/operator/zipAll';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  rdosBusqueda:Producto[];
  rdosOriginales:Producto[];
  cantidadRdos:number;
  propiedades:PropiedadProducto[];
  marcas:Marca[];
  subcategorias:Subcategoria[];
  submenu:boolean=false
  images:any[]=[
    {
      img:'../../../../assets/imagenes/prod1.jpg'
    },
    {
      img:'../../../../assets/imagenes/prod2.png ',
    },
    {
      img:'../../../../assets/imagenes/prod3.jpg'},
    {
      img:'../../../../assets/imagenes/prod4.jpg',
    },
    {
      img:'../../../../assets/imagenes/prod5.jpg',
    },
    {
      img:'../../../../assets/imagenes/prod6.jpg',
    }
  ];
  constructor(private catalogoservice:CatalogoService, private activatedRoute:ActivatedRoute) {

   }

  ngOnInit(): void {
    this.getRdoBusqueda();
     
  }

  getRdoBusqueda():void{
    this.activatedRoute.params.subscribe(params=>{
      let termino=params.termino;
      if (termino!==null && termino!==undefined) {
        this.catalogoservice.getRdoBusqueda(termino).subscribe(response=>{ 
          this.rdosBusqueda=response.productos;
          this.rdosOriginales=response.productos;
          //mostrar cantidad de rdos
          this.cantidadRdos=response.totalProductos;
          //mostrar propiedades 
          this.propiedades=response.propiedades;
          //mostrar marcas
          this.marcas=response.marcas;
          //mostrar subcategorias
          this.subcategorias=response.subcategorias;
          for (let index = 0; index < this.rdosBusqueda.length; index++) {
            this.rdosBusqueda[index].foto = this.images[index]?.img;       
          }
        });
        let mostrarTermino= document.getElementById("termino-busqueda");
        mostrarTermino.innerText=termino;
       let mostrarTerminoRuta= document.getElementById("nombre-busqueda");
       mostrarTerminoRuta.innerText=termino;

      
      }
    })
  }
  mostrarOrdenar(){
    let up = document.getElementById("arrow2");
    let down = document.getElementById("arrow");
    let opciones = document.getElementById("submenu");
    if(this.submenu){
      opciones.style.display="none";
      down.style.display="block"
      up.style.display="none";
      this.submenu=false;
    }else{
      opciones.style.display="block";
      down.style.display="none"
      up.style.display="block"

      this.submenu=true;
    }

  }

  //////// MÉTODOS DE FILTRADO //////// 
  filtrarMarcas(){
      //inicializo los rdos para q si cambio de opcion me haga el filter sobre todo el rdo y no sobre el filter anterior
    this.rdosBusqueda=this.rdosOriginales
    for (var i=0; i<this.marcas.length; i++){
    var radioButMarcas = document.getElementsByName("marca") as unknown as HTMLCollectionOf<HTMLInputElement>;

      if (radioButMarcas[i].checked == true) { 
        let marcaSeleccionada= this.marcas[i].nombre;

        for (let i = 0; i < this.rdosBusqueda.length; i++) {
         if(this.rdosBusqueda[i].marca.nombre == marcaSeleccionada){
          this.rdosBusqueda= this.rdosBusqueda.filter(rdo => rdo.marca.nombre==marcaSeleccionada);
       
         }          
        }
      }
    }
}
filtrarSubcategorias(){
  //inicializo los rdos para q si cambio de opcion me haga el filter sobre todo el rdo y no sobre el filter anterior
  this.rdosBusqueda=this.rdosOriginales
  for (var i=0; i<this.subcategorias.length; i++){
  var radioButSubcat = document.getElementsByName("subcategoria") as unknown as HTMLCollectionOf<HTMLInputElement>;
    
    if (radioButSubcat[i].checked == true) { 
      let subcatSeleccionada= this.subcategorias[i].nombre;
      for (let i = 0; i < this.rdosBusqueda.length; i++) {
       if(this.rdosBusqueda[i].subcategoria.nombre == subcatSeleccionada){
        this.rdosBusqueda= this.rdosBusqueda.filter(rdo => rdo.subcategoria.nombre==subcatSeleccionada);
       }          
     }
    }
  }
}
filtrarPropiedades(index:number){
  //inicializo los rdos para q si cambio de opcion me haga el filter sobre todo el rdo y no sobre el filter anterior
  this.rdosBusqueda=this.rdosOriginales

   var propiedadSeleccionada=this.propiedades[index]
   var  radioButPropiedad = document.getElementsByName(propiedadSeleccionada.nombre) as unknown as HTMLCollectionOf<HTMLInputElement>;

  for (var x=0; x<radioButPropiedad.length; x++){
    if (radioButPropiedad[x].checked == true) { 
          let propSeleccionada= this.propiedades[index].nombre;
          let rdosFiltrados=[];
           for (let z = 0; z < this.rdosBusqueda.length; z++) {
             for (let i = 0; i < this.rdosBusqueda[z].propiedades.length; i++){
              if(this.rdosBusqueda[z].propiedades[i].nombre == propSeleccionada){
                rdosFiltrados.push(this.rdosBusqueda[z])
                
              }          
           }
          }
          this.rdosBusqueda=rdosFiltrados
        }
      
    }

} 
aMenorPrecio(){
   ///////////////mas barato a mas caro /////
    this.rdosBusqueda.sort((a, b) => a.precio - b.precio);
}
aMayorPrecio(){
  ///////////////mas barato a mas caro /////
   this.rdosBusqueda.sort((a, b) => b.precio - a.precio);
}
  ordenarAZ(){
    this.rdosBusqueda.sort((a,b)=>a.nombre.localeCompare(b.nombre))
  }
  ordenarZA(){
    this.rdosBusqueda.sort((a,b)=>-1 * a.nombre.localeCompare(b.nombre))
  }
}
