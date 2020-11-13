import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';
import { ItemCarrito } from 'src/app/cart/clases/item-carrito';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {
  @Input() producto:Producto;
  infoProducto:Producto;
  oferta:boolean=true;
  destacado:boolean=true;
  constructor(private catalogoservice:CatalogoService,private _cartService:MockCartService) { }

  ngOnInit(): void {
    this.infoProducto=new Producto();

    //mostrar tags sin superponerse
    if (this.oferta && this.destacado) {
      let oferta = document.getElementsByClassName("off")  as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < oferta.length; i++) {
        oferta[i].style.top="20px"      
      } 
      }

  }

  saveToFav(){
  // let hearts=document.getElementsByClassName("fav") as HTMLCollectionOf<HTMLElement>;
  // for (let i = 0; i < hearts.length; i++) {
  //     hearts[i].style.color="red";
  //   hearts[i].classList.add("fas");       
  // } 
 
}
  addCart(infoProducto:Producto){
    let item:ItemCarrito=new ItemCarrito();
    item.cantidad=1;
    item.producto=infoProducto;
    this._cartService.changeCart(item);
 }


}
