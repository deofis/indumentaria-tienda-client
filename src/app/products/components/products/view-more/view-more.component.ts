import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrito } from 'src/app/cart/clases/item-carrito';
import { MockCartService } from 'src/app/cart/services/mock-cart.service';
import { Producto } from 'src/app/products/clases/producto';
import { CatalogoService } from 'src/app/products/services/catalogo.service';
import { CarritoService } from '../../../../cart/services/carrito.service';
import { AuthService } from '../../../../log-in/services/auth.service';
import { Carrito } from '../../../../cart/clases/carrito';
import { PropiedadProducto } from 'src/app/products/clases/propiedad-producto';


@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

  stock: boolean;
  infoProducto:Producto;
  propiedadesProducto:PropiedadProducto[];

  destacado:boolean=false;
  oferta:boolean=false;
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
    this.getPropiedadesProducto();

    // cambio de muestra de imagenes
    let img1= document.getElementById("img-uno");
    let img2= document.getElementById("img-dos");
    let img3= document.getElementById("img-tres");
    let img4= document.getElementById("img-cuatro");
    let img5= document.getElementById("img-cinco");
    let img6= document.getElementById("img-seis");
    img1.addEventListener("click",this.changeImg1);
    img2.addEventListener("click",this.changeImg2);
    img3.addEventListener("click",this.changeImg3);
    img4.addEventListener("click",this.changeImg4);
    img5.addEventListener("click",this.changeImg5);
    img6.addEventListener("click",this.changeImg6);
    //// boton enviar pregunta
    let btnSend = document.getElementById("enviarMsg")
    btnSend.addEventListener("click",this.deleteMessage);
 
    /// precio oferta
    this.estaEnOferta();

    // destacado 
    this.destacadosInsignia();
  }

  destacadosInsignia(){
    if (this.infoProducto.destacado) {
      this.destacado=false
    }else{
      this.destacado=true
    }
  }
  estaEnOferta(){
    if (this.infoProducto.promocion!== null) {
        this.oferta=true   
    }else{
      this.oferta=false
    }
  }
  mostrarPrecio(){
    if (this.oferta) {
      return false
    }else{
      return true
    }
  }

  ////////// INICIO CAMBIOS DE IMAGENES ////////////
  changeImg1(){
    let imgPpal= document.getElementById("img-ppal");
    let url1="url(https://www.mgmstore.com.ar/339-large_default/Samsung-Galaxy-S10-Plus-128GB.jpg)";
   imgPpal.style.backgroundImage=url1;
  }
  changeImg2(){
    let imgPpal= document.getElementById("img-ppal");
    let url2="url(https://img.global.news.samsung.com/cl/wp-content/uploads/2020/01/lite.jpeg)";
   imgPpal.style.backgroundImage=url2;
  }
  changeImg3(){
    let imgPpal= document.getElementById("img-ppal");
    let url3="url(https://doto.vteximg.com.br/arquivos/ids/156984-1200-1200/samsung-galaxy-s20-rosa-1-doto-bothview.jpg?v=637236891053970000)";
   imgPpal.style.backgroundImage=url3;
  }
  changeImg4(){
    let imgPpal= document.getElementById("img-ppal");
    let url4="url(https://www.maxmovil.com/media/catalog/product/cache/1/small_image/9df78eab33525d08d6e5fb8d27136e95/_/0/_0002_samsung-galaxy-s20-plus-8-128gb-cosmic-black-libre.jpg)";
   imgPpal.style.backgroundImage=url4;
  }
  changeImg5(){
    let imgPpal= document.getElementById("img-ppal");
    let url5="url(https://www.muycomputer.com/wp-content/uploads/2019/01/Samsung-Galaxy-S10.jpg)";
   imgPpal.style.backgroundImage=url5;
  }
  changeImg6(){
    let imgPpal= document.getElementById("img-ppal");
    let url6="url(https://as01.epimg.net/meristation/imagenes/2020/02/11/betech/1581450045_842534_1581450104_noticia_normal_recorte1.jpg)";
   imgPpal.style.backgroundImage=url6;
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
    cartel.style.color="#2779cd"
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
  };

  getPropiedadesProducto(){
    this.activatedroute.params.subscribe(param => {
      let id = param.id;
      this.catalogoservice.getPropiedadesProducto(id).subscribe((resp:any) => {

        this.propiedadesProducto = resp;
        console.log(this.propiedadesProducto);
        
      });
    });
    
  };

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

}
