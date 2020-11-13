"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardGridComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var item_carrito_1 = require("src/app/cart/clases/item-carrito");
var producto_1 = require("src/app/products/clases/producto");
var CardGridComponent = /** @class */ (function () {
    function CardGridComponent(catalogoservice, _cartService) {
        this.catalogoservice = catalogoservice;
        this._cartService = _cartService;
        this.oferta = true;
        this.destacado = true;
    }
    CardGridComponent.prototype.ngOnInit = function () {
        this.infoProducto = new producto_1.Producto();
        //mostrar tags sin superponerse
        if (this.oferta && this.destacado) {
            var oferta = document.getElementsByClassName("off");
            for (var i = 0; i < oferta.length; i++) {
                oferta[i].style.top = "20px";
            }
        }
    };
    CardGridComponent.prototype.saveToFav = function () {
        var corazon = document.getElementById("fav");
        corazon.style.color = "red";
        corazon.classList.add("fas");
    };
    CardGridComponent.prototype.addCart = function (producto) {
        var item = new item_carrito_1.ItemCarrito();
        item.cantidad = 1;
        item.producto = producto;
        console.log(item.producto);
        //this._cartService.changeCart(item);
    };
    __decorate([
        core_1.Input()
    ], CardGridComponent.prototype, "producto");
    CardGridComponent = __decorate([
        core_2.Component({
            selector: 'app-card-grid',
            templateUrl: './card-grid.component.html',
            styleUrls: ['./card-grid.component.scss']
        })
    ], CardGridComponent);
    return CardGridComponent;
}());
exports.CardGridComponent = CardGridComponent;
