"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckoutComponent = void 0;
var core_1 = require("@angular/core");
var carrito_1 = require("src/app/cart/clases/carrito");
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(_cartService) {
        this._cartService = _cartService;
        this.carrito = new carrito_1.Carrito();
        this.items = [];
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        /*
        this._cartService.currentDataCart$.subscribe(x=>{
          if(x)
          {
            this.items = x;
            this.totalQuantity = x.length;
             this.totalPrice = x.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
            
          }
          
        })
        */
    };
    CheckoutComponent.prototype.showInputAdress = function () {
        var newAdress = document.getElementById("newAdress12");
        newAdress.style.display = "inherit";
        var ourAdress = document.getElementById("ourAdress");
        ourAdress.style.display = "none";
    };
    CheckoutComponent.prototype.showAdress = function () {
        var ourAdress = document.getElementById("ourAdress");
        ourAdress.style.display = "inherit";
        var newAdress = document.getElementById("newAdress12");
        newAdress.style.display = "none";
        var cash = document.getElementById("cash-box");
        cash.style.display = "inherit";
    };
    CheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        })
    ], CheckoutComponent);
    return CheckoutComponent;
}());
exports.CheckoutComponent = CheckoutComponent;
