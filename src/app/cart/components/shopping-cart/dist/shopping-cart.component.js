"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShoppingCartComponent = void 0;
var core_1 = require("@angular/core");
var carrito_1 = require("../../clases/carrito");
var ShoppingCartComponent = /** @class */ (function () {
    //  items: Array<ItemCarrito>;
    //  totalPrice:number ;
    //  totalQuantity:number;
    // carrito:MockCarrito;
    function ShoppingCartComponent(carritoService, _cartService, authService) {
        this.carritoService = carritoService;
        this._cartService = _cartService;
        this.authService = authService;
        this.carrito = new carrito_1.Carrito();
        this.totalProductos = 0;
        // this.carrito=new MockCarrito();
        // this.items=[]
    }
    ShoppingCartComponent.prototype.ngOnInit = function () {
        this.getCarrito();
        // this.items=JSON.parse(localStorage.getItem("Mi Carrito"));
        // console.log(this.items)
        // this._cartService.currentDataCart$.subscribe(x=>{
        //   if(x)
        //   {
        //     this.items = x;
        //     this.totalQuantity = x.length;
        //      this.totalPrice = x.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
        //   }
        // })
    };
    ShoppingCartComponent.prototype.getCarrito = function () {
        var _this = this;
        if (this.authService.isLoggedIn()) {
            this.carritoService.getCarrito().subscribe(function (response) {
                _this.carrito = response.carrito;
                _this.totalProductos = _this.carrito.items.length;
            });
        }
        this.carrito = this._cartService.getCarrito();
        this.totalProductos = this.carrito.items.length;
        console.log(this.carrito);
    };
    ShoppingCartComponent.prototype.eliminarItem = function (id) {
        var _this = this;
        var productoId = id.toString();
        this.carrito.items = this.carrito.items.filter(function (item) { return id !== item.producto.id; });
        this.carritoService.eliminarItem(productoId).subscribe(function (response) {
            _this.carrito = response.carritoActualizado;
        });
    };
    ShoppingCartComponent.prototype.decrementarCantidad = function (item) {
        var _this = this;
        var productoId = item.producto.id;
        this.carrito.items = this.carrito.items.map(function (item) {
            if (productoId == item.producto.id) {
                --item.cantidad;
            }
            ;
            return item;
        });
        if (item.cantidad == 0) {
            return this.eliminarItem(productoId);
        }
        console.log(item.cantidad);
        this.carritoService.actualizarCantidad(item.cantidad.toString(), productoId.toString()).subscribe(function (response) {
            _this.carrito = response.carritoActualizado;
        });
    };
    ShoppingCartComponent.prototype.incrementarCantidad = function (item) {
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            selector: 'app-shopping-cart',
            templateUrl: './shopping-cart.component.html',
            styleUrls: ['./shopping-cart.component.scss']
        })
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
