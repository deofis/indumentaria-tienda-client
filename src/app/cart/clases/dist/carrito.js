"use strict";
exports.__esModule = true;
exports.Carrito = void 0;
var Carrito = /** @class */ (function () {
    function Carrito() {
        this.fechaCreacion = new Date().toString();
        this.items = [];
    }
    Carrito.prototype.calcularTotal = function () {
        var total = 0;
        this.items.forEach(function (item) {
            total += total + item.calcularSubtotal();
        });
        this.total = total;
        return this.total;
    };
    return Carrito;
}());
exports.Carrito = Carrito;
