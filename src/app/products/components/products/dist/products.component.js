"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsComponent = void 0;
var core_1 = require("@angular/core");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(catalogoService) {
        this.catalogoService = catalogoService;
        this.fotosCategorias = [
            {
                img: '../../../../assets/imagenes/categoria1.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria2.jpg '
            },
            {
                img: '../../../../assets/imagenes/categoria3.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria4a.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria5a.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria6.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria7b.jpg'
            },
            {
                img: '../../../../assets/imagenes/categoria8a.jpg'
            }
        ];
        this.back1 = false;
        this.back2 = false;
        this.tarjeta = document.querySelectorAll(".tarjetas");
        this.cantidadPaginas = Math.ceil(this.tarjeta.length / 5);
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        /// ****  *** CARUSEL PRODUCTOS DESTACADOS *** ****  ///
        var fila = document.getElementById("contenedor-carouselDestacados");
        var flecha1 = document.getElementById("flecha-izquierda-fila1");
        var flecha2 = document.getElementById("flecha-derecha-fila1");
        flecha2.addEventListener("click", function () {
            fila.scrollLeft += fila.offsetWidth;
            _this.back1 = true;
            _this.backButton1();
        });
        flecha1.addEventListener("click", function () {
            fila.scrollLeft -= fila.offsetWidth;
            _this.back1 = false;
            _this.backButton1();
        });
        /// ****  *** CARUSEL OFERTAS *** ****  ///
        var fila2 = document.getElementById("contenedor-carouselOfertas");
        var flecha3 = document.getElementById("flecha-izquierda-fila2");
        var flecha4 = document.getElementById("flecha-derecha-fila2");
        flecha4.addEventListener("click", function () {
            fila2.scrollLeft += fila2.offsetWidth;
            _this.back2 = true;
            _this.backButton2();
        });
        flecha3.addEventListener("click", function () {
            fila2.scrollLeft -= fila2.offsetWidth;
            _this.back2 = false;
            _this.backButton2();
        });
        /// EFECTO CATEGORIAS
        this.getProductosDestacados();
        this.getOfertas();
        this.getListaCategorias();
        this.paginacion();
        window.addEventListener("scroll", this.showCategoriesEffect);
        /// ocultar boton izquierdo
        this.backButton1();
        this.backButton2();
        //this.categoriasFoto();
    };
    ProductsComponent.prototype.backButton1 = function () {
        var flecha1 = document.getElementById("flecha-izquierda-fila1");
        if (this.back1 == false) {
            flecha1.style.display = "none";
        }
        else {
            flecha1.style.display = "initial";
        }
    };
    ProductsComponent.prototype.backButton2 = function () {
        var flecha3 = document.getElementById("flecha-izquierda-fila2");
        if (this.back2 == false) {
            flecha3.style.display = "none";
        }
        else {
            flecha3.style.display = "initial";
        }
    };
    //// mostar categorias
    ProductsComponent.prototype.showCategoriesEffect = function () {
        var animado = document.querySelectorAll(".card-c");
        var scrollTop = document.documentElement.scrollTop;
        for (var i = 0; i < animado.length; i++) {
            var alturaAnimado = animado[i].offsetTop;
            if (alturaAnimado - 450 < scrollTop) {
                animado[i].style.opacity = "1";
                animado[i].classList.add("animacion");
            }
        }
    };
    ///// PAGINACION ARREGLAR 
    ProductsComponent.prototype.paginacion = function () {
        var fila = document.getElementById("contenedor-carouselDestacados");
        var _loop_1 = function (i) {
            var indicador = document.createElement("button");
            if (i === 0) {
                indicador.classList.add("activo");
            }
            document.querySelector(".indicadores").appendChild(indicador);
            indicador.addEventListener("click", function (e) {
                fila.scrollLeft = i * fila.offsetWidth;
                document.querySelector(".indicadores .activo").classList.remove("activo");
                //  e.target.classList.add("activo)
            });
        };
        for (var i = 0; i < this.cantidadPaginas; i++) {
            _loop_1(i);
        }
    };
    ProductsComponent.prototype.getProductosDestacados = function () {
        var _this = this;
        this.catalogoService.getProductosDestacados().subscribe(function (response) {
            _this.productosDestacados = response;
        });
    };
    ProductsComponent.prototype.getOfertas = function () {
        var _this = this;
        this.catalogoService.getProductos().subscribe(function (response) {
            _this.todosLosProductos = response;
            _this.ofertas = _this.todosLosProductos.filter(function (rdo) { return rdo.promocion !== null; });
        });
    };
    /***** get Categories *****/
    ProductsComponent.prototype.getListaCategorias = function () {
        var _this = this;
        this.catalogoService.getListaCategorias().subscribe(function (response) {
            _this.categorias = response;
            for (var index = 0; index < _this.categorias.length; index++) {
                _this.categorias[index].foto = _this.fotosCategorias[index].img;
            }
            console.log(_this.categorias);
        });
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
