import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  rdosBusqueda:Producto[];
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
          this.rdosBusqueda=response;
          for (let index = 0; index < this.rdosBusqueda.length; index++) {
            this.rdosBusqueda[index].foto = this.images[index]?.img;       
          }
        });
        let mostrarTermino= document.getElementById("termino-busqueda");
        mostrarTermino.innerText=termino;
       let mostrarTerminoRuta= document.getElementById("nombre-busqueda");
       mostrarTerminoRuta.innerText=termino
      }
    })
  }
}
