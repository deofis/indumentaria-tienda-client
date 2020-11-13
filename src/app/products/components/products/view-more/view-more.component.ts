import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrito } from 'src/app/cart/clases/item-carrito';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { CarritoService } from '../../../../cart/services/carrito.service';
import { AuthService } from '../../../../log-in/services/auth.service';
import { Carrito } from '../../../../cart/clases/carrito';


@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

  stock: boolean;
  infoProducto:Producto;

  constructor(private catalogoservice:CatalogoService,
              private activatedroute:ActivatedRoute,
              private _cartService:MockCartService,
              private carritoService: CarritoService,
              private authService: AuthService) { 
    this.stock = true;
    this.infoProducto=new Producto();
  }

  ngOnInit(): void {
    this.getProduct();

    // cambio de muestra de imagenes
    let img1= document.getElementById("img-uno");
    let img2= document.getElementById("img-dos");
    let img3= document.getElementById("img-tres");
    let img4= document.getElementById("img-cuatro");
    
    img1.addEventListener("click",this.changeImg1);
    img2.addEventListener("click",this.changeImg2);
    img3.addEventListener("click",this.changeImg3);
    img4.addEventListener("click",this.changeImg4);

    //// boton enviar pregunta
    let btnSend = document.getElementById("enviarMsg")
    btnSend.addEventListener("click",this.deleteMessage);
  
    /////EFECTO TITULO 
    window.addEventListener("scroll",this.showTitleEffect)


  }

  
  ////////// INICIO CAMBIOS DE IMAGENES ////////////
  changeImg1(){
    let imgPpal= document.getElementById("img-ppal");
    let url1="url(https://d26lpennugtm8s.cloudfront.net/stores/086/894/products/img-20200518-wa00101-9587272a3a2cc19c4715898271067988-1024-1024.jpg)";
   imgPpal.style.backgroundImage=url1;
  }
  changeImg2(){
    let imgPpal= document.getElementById("img-ppal");
    let url2="url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrVkIGh9jsHdgQi8RYojCJmVbWcvktrY4wWA&usqp=CAU)";
   imgPpal.style.backgroundImage=url2;
  }
  changeImg3(){
    let imgPpal= document.getElementById("img-ppal");
    let url3="url(https://www.aquadelta.com.ar/img/articulos/termo_stanley_classic_750_ml_polar_blanco_1_imagen2.jpg)";
   imgPpal.style.backgroundImage=url3;
  }
  changeImg4(){
    let imgPpal= document.getElementById("img-ppal");
    let url4="url(https://d2ye0ltusw47tz.cloudfront.net/196572-large_default/termo-stanley-clasico-14-lts-plegable-rojo-10-08999-007.jpg)";
   imgPpal.style.backgroundImage=url4;
  }
//////// FIN CAMBIO DE IMAGENES //////////

//////////// EVENTO DE BOTON ENVIAR ///////////
  deleteMessage(){
     let mensaje = document.getElementById("pregunta");
     
    // if(mensaje.value!=="")
    // mensaje.nodeValue="";

    // cabio de cartel 
    let cartel=document.getElementById("cartel");
    cartel.innerHTML="Gracias! Te responderemos a la brevedad.";
    let contenedor=document.getElementById("contenedorCartel");
   
    
  }

  getProduct(){
    this.activatedroute.params.subscribe(param=> {
      let id= param.id;
      this.catalogoservice.getInfoProducto(id).subscribe(response => {
        this.infoProducto=response;
        console.log(this.infoProducto);
      });
    });
  }

  agregarCarrito(producto: Producto): void {
    if (this.authService.isLoggedIn()) {
      this.carritoService.agregarProducto(producto.id.toString()).subscribe(response => {
        alert('Producto agregado al carrito');
      });
    }
    
    this._cartService.agregarItem(producto);

  }
  /*
///// CANTIDAD////
public  removeOne(item:ItemCarrito){
  this._cartService.removeOneElementCart(item)
}
public addOne(item:ItemCarrito){
  this._cartService.addOneElementCart(item)
}
*/

///////// Agregar al carrito /////////
//   addCart(producto:Producto){
//     let item:ItemCarrito=new ItemCarrito();
//     item.cantidad=1;
//     item.producto=producto;
//     console.log(item.producto);
//     this._cartService.changeCart(item);
//  }


 /////EFECTO TITULO 
 showTitleEffect() {
  let animado= document.getElementById("titulo-a");
  let scrollTop= document.documentElement.scrollTop;
  let alturaAnimado= animado.offsetTop;
    if(alturaAnimado-550<scrollTop){
      animado.style.opacity="1";
      animado.classList.add("animacion-titulo")
    }
  
}

}
