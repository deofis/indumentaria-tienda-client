"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardCarouselComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var item_carrito_1 = require("src/app/cart/clases/item-carrito");
var producto_1 = require("src/app/products/clases/producto");
var CardCarouselComponent = /** @class */ (function () {
    function CardCarouselComponent(catalogoservice, _cartService) {
        this.catalogoservice = catalogoservice;
        this._cartService = _cartService;
        this.oferta = true;
        this.destacado = true;
    }
    CardCarouselComponent.prototype.ngOnInit = function () {
        this.infoProducto = new producto_1.Producto();
        //mostrar tags sin superponerse
        if (this.oferta && this.destacado) {
            var oferta = document.getElementsByClassName("off");
            for (var i = 0; i < oferta.length; i++) {
                oferta[i].style.top = "20px";
            }
        }
    };
    CardCarouselComponent.prototype.saveToFav = function () {
        // let hearts=document.getElementsByClassName("fav") as HTMLCollectionOf<HTMLElement>;
        // for (let i = 0; i < hearts.length; i++) {
        //     hearts[i].style.color="red";
        //   hearts[i].classList.add("fas");       
        // } 
    };
    CardCarouselComponent.prototype.addCart = function (infoProducto) {
        var item = new item_carrito_1.ItemCarrito();
        item.cantidad = 1;
        item.producto = infoProducto;
        //this._cartService.changeCart(item);
    };
    __decorate([
        core_1.Input()
    ], CardCarouselComponent.prototype, "producto");
    CardCarouselComponent = __decorate([
        core_2.Component({
            selector: 'app-card-carousel',
            templateUrl: './card-carousel.component.html',
            styleUrls: ['./card-carousel.component.scss']
        })
    ], CardCarouselComponent);
    return CardCarouselComponent;
}());
exports.CardCarouselComponent = CardCarouselComponent;
