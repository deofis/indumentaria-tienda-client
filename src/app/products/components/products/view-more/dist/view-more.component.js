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
        this.destacado = false;
        this.oferta = false;
        this.stock = true;
        this.infoProducto = new producto_1.Producto();
    }
    ViewMoreComponent.prototype.ngOnInit = function () {
        this.getProduct();
        this.getPropiedadesProducto();
        // cambio de muestra de imagenes
        var img1 = document.getElementById("img-uno");
        var img2 = document.getElementById("img-dos");
        var img3 = document.getElementById("img-tres");
        var img4 = document.getElementById("img-cuatro");
        var img5 = document.getElementById("img-cinco");
        var img6 = document.getElementById("img-seis");
        img1.addEventListener("click", this.changeImg1);
        img2.addEventListener("click", this.changeImg2);
        img3.addEventListener("click", this.changeImg3);
        img4.addEventListener("click", this.changeImg4);
        img5.addEventListener("click", this.changeImg5);
        img6.addEventListener("click", this.changeImg6);
        //// boton enviar pregunta
        var btnSend = document.getElementById("enviarMsg");
        btnSend.addEventListener("click", this.deleteMessage);
        /// precio oferta
        this.estaEnOferta();
        // destacado 
        this.destacadosInsignia();
    };
    ViewMoreComponent.prototype.destacadosInsignia = function () {
        if (this.infoProducto.destacado) {
            this.destacado = false;
        }
        else {
            this.destacado = true;
        }
    };
    ViewMoreComponent.prototype.estaEnOferta = function () {
        if (this.infoProducto.promocion !== null) {
            this.oferta = true;
        }
        else {
            this.oferta = false;
        }
    };
    ViewMoreComponent.prototype.mostrarPrecio = function () {
        if (this.oferta) {
            return false;
        }
        else {
            return true;
        }
    };
    ////////// INICIO CAMBIOS DE IMAGENES ////////////
    ViewMoreComponent.prototype.changeImg1 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url1 = "url(https://www.mgmstore.com.ar/339-large_default/Samsung-Galaxy-S10-Plus-128GB.jpg)";
        imgPpal.style.backgroundImage = url1;
    };
    ViewMoreComponent.prototype.changeImg2 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url2 = "url(https://img.global.news.samsung.com/cl/wp-content/uploads/2020/01/lite.jpeg)";
        imgPpal.style.backgroundImage = url2;
    };
    ViewMoreComponent.prototype.changeImg3 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url3 = "url(https://doto.vteximg.com.br/arquivos/ids/156984-1200-1200/samsung-galaxy-s20-rosa-1-doto-bothview.jpg?v=637236891053970000)";
        imgPpal.style.backgroundImage = url3;
    };
    ViewMoreComponent.prototype.changeImg4 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url4 = "url(https://www.maxmovil.com/media/catalog/product/cache/1/small_image/9df78eab33525d08d6e5fb8d27136e95/_/0/_0002_samsung-galaxy-s20-plus-8-128gb-cosmic-black-libre.jpg)";
        imgPpal.style.backgroundImage = url4;
    };
    ViewMoreComponent.prototype.changeImg5 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url5 = "url(https://www.muycomputer.com/wp-content/uploads/2019/01/Samsung-Galaxy-S10.jpg)";
        imgPpal.style.backgroundImage = url5;
    };
    ViewMoreComponent.prototype.changeImg6 = function () {
        var imgPpal = document.getElementById("img-ppal");
        var url6 = "url(https://as01.epimg.net/meristation/imagenes/2020/02/11/betech/1581450045_842534_1581450104_noticia_normal_recorte1.jpg)";
        imgPpal.style.backgroundImage = url6;
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
        cartel.style.color = "#2779cd";
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
    ;
    ViewMoreComponent.prototype.getPropiedadesProducto = function () {
        var _this = this;
        this.activatedroute.params.subscribe(function (param) {
            var id = param.id;
            _this.catalogoservice.getPropiedadesProducto(id).subscribe(function (resp) {
                _this.propiedadesProducto = resp;
                console.log(_this.propiedadesProducto);
            });
        });
    };
    ;
    ViewMoreComponent.prototype.agregarCarrito = function (producto) {
        if (this.authService.isLoggedIn()) {
            this.carritoService.agregarProducto(producto.id.toString()).subscribe(function (response) {
                alert('Producto agregado al carrito');
            });
        }
        this._cartService.agregarItem(producto);
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
