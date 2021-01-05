"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResumenCarritoComponent = void 0;
var core_1 = require("@angular/core");
var carrito_1 = require("src/app/cart/clases/carrito");
var ResumenCarritoComponent = /** @class */ (function () {
    function ResumenCarritoComponent(carritoService, authService, Router) {
        this.carritoService = carritoService;
        this.authService = authService;
        this.Router = Router;
        this.costoDeEnvio = 15;
        this.carrito = new carrito_1.Carrito();
    }
    ResumenCarritoComponent.prototype.ngOnInit = function () {
        this.getCarrito();
    };
    ResumenCarritoComponent.prototype.getCarrito = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            this.carritoService.getCarrito().subscribe(function (response) {
                _this.carrito = response.carrito;
                _this.totalProductos = _this.carrito.items.length;
            });
        }
    };
    ResumenCarritoComponent = __decorate([
        core_1.Component({
            selector: 'app-resumen-carrito',
            templateUrl: './resumen-carrito.component.html',
            styleUrls: ['./resumen-carrito.component.scss']
        })
    ], ResumenCarritoComponent);
    return ResumenCarritoComponent;
}());
exports.ResumenCarritoComponent = ResumenCarritoComponent;
