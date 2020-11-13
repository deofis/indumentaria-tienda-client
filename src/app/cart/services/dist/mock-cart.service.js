"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MockCartService = void 0;
var core_1 = require("@angular/core");
var carrito_1 = require("../clases/carrito");
var detalle_carrito_1 = require("../clases/detalle-carrito");
var MockCartService = /** @class */ (function () {
    function MockCartService() {
        this.carrito = new carrito_1.Carrito();
    }
    MockCartService.prototype.agregarItem = function (producto) {
        var existeProducto;
        if (localStorage.getItem('carrito')) {
            this.carrito = JSON.parse(localStorage.getItem('carrito'));
        }
        else {
            this.carrito = new carrito_1.Carrito();
        }
        this.carrito.items.forEach(function (item) {
            if (item.producto.id === producto.id) {
                existeProducto = true;
                ++item.cantidad;
            }
            else {
                existeProducto = false;
            }
        });
        if (!existeProducto) {
            var item = new detalle_carrito_1.DetalleCarrito();
            item.producto = producto;
            item.cantidad = 1;
            this.carrito.items.push(item);
        }
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        console.log(this.carrito);
    };
    MockCartService.prototype.getCarrito = function () {
        return JSON.parse(localStorage.getItem('carrito'));
    };
    MockCartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MockCartService);
    return MockCartService;
}());
exports.MockCartService = MockCartService;
