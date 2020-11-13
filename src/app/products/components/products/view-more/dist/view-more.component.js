"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewMoreComponent = void 0;
var core_1 = require("@angular/core");
var producto_1 = require("src/app/products/clases/producto");
var ViewMoreComponent = /** @class */ (function () {
    function ViewMoreComponent(catalogoservice, activatedroute, _cartService, carritoService, authService) {
        this.catalogoservice = catalogoservice;
        this.activatedroute = activatedroute;
        this._cartService = _cartService;
        this.carritoService = carritoService;
        this.authService = authService;
        this.stock = true;
        this.infoProducto = new producto_1.Producto();
    }
    ViewMoreComponent.prototype.ngOnInit = function () {
        this.getProduct();
        // cambio de muestra de imagenes
        var img1 = document.getElementById("img-uno");
        var img2 = document.getElementById("img-dos");
        var img3 = document.getElementById("img-tres");
        var img4 = document.getElementById("img-cuatro");
        img1.addEventListener("click", this.changeImg1);
        img2.addEventListener("click", this.changeImg2);
        img3.addEventListener("click", this.changeImg3);
        img4.addEventListener("click", this.changeImg4);
        //// boton enviar pregunta
        var btnSend = document.getElementById("enviarMsg");
        btnSend.addEventListener("click", this.deleteMessage);
        /////EFECTO TITULO 
        window.addEventListener("scroll", this.showTitleEffect);
    };
    ////////// INICIO CAMBIOS DE IMAGENES ////////////
    ViewMoreComponent.prototype.changeImg1 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url1 = "url(https://d26lpennugtm8s.cloudfront.net/stores/086/894/products/img-20200518-wa00101-9587272a3a2cc19c4715898271067988-1024-1024.jpg)";
        imgPpal.style.backgroundImage = url1;
    };
    ViewMoreComponent.prototype.changeImg2 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url2 = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrVkIGh9jsHdgQi8RYojCJmVbWcvktrY4wWA&usqp=CAU)";
        imgPpal.style.backgroundImage = url2;
    };
    ViewMoreComponent.prototype.changeImg3 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url3 = "url(https://www.aquadelta.com.ar/img/articulos/termo_stanley_classic_750_ml_polar_blanco_1_imagen2.jpg)";
        imgPpal.style.backgroundImage = url3;
    };
    ViewMoreComponent.prototype.changeImg4 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url4 = "url(https://d2ye0ltusw47tz.cloudfront.net/196572-large_default/termo-stanley-clasico-14-lts-plegable-rojo-10-08999-007.jpg)";
        imgPpal.style.backgroundImage = url4;
    };
    //////// FIN CAMBIO DE IMAGENES //////////
    //////////// EVENTO DE BOTON ENVIAR ///////////
    ViewMoreComponent.prototype.deleteMessage = function () {
        var mensaje = document.getElementById("pregunta");
        // if(mensaje.value!=="")
        // mensaje.nodeValue="";
        // cabio de cartel 
        var cartel = document.getElementById("cartel");
        cartel.innerHTML = "Gracias! Te responderemos a la brevedad.";
        var contenedor = document.getElementById("contenedorCartel");
    };
    ViewMoreComponent.prototype.getProduct = function () {
        var _this = this;
        this.activatedroute.params.subscribe(function (param) {
            var id = param.id;
            _this.catalogoservice.getInfoProducto(id).subscribe(function (response) {
                _this.infoProducto = response;
                console.log(_this.infoProducto);
            });
        });
    };
    ViewMoreComponent.prototype.agregarCarrito = function (producto) {
        if (this.authService.isLoggedIn()) {
            this.carritoService.agregarProducto(producto.id.toString()).subscribe(function (response) {
                alert('Producto agregado al carrito');
            });
        }
        this._cartService.agregarItem(producto);
    };
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
    ViewMoreComponent.prototype.showTitleEffect = function () {
        var animado = document.getElementById("titulo-a");
        var scrollTop = document.documentElement.scrollTop;
        var alturaAnimado = animado.offsetTop;
        if (alturaAnimado - 550 < scrollTop) {
            animado.style.opacity = "1";
            animado.classList.add("animacion-titulo");
        }
    };
    ViewMoreComponent = __decorate([
        core_1.Component({
            selector: 'app-view-more',
            templateUrl: './view-more.component.html',
            styleUrls: ['./view-more.component.scss']
        })
    ], ViewMoreComponent);
    return ViewMoreComponent;
}());
exports.ViewMoreComponent = ViewMoreComponent;
