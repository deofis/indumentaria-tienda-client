"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MisComprasComponent = void 0;
var core_1 = require("@angular/core");
var MisComprasComponent = /** @class */ (function () {
    function MisComprasComponent() {
    }
    MisComprasComponent.prototype.ngOnInit = function () {
    };
    MisComprasComponent.prototype.showDetail1 = function () {
        ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
        var detail = document.getElementById("compra1");
        detail.style.display = "block";
        ///// *** **** SUBRAYADO *** *** /////
        var border = document.getElementById("cont-compra1");
        border.style.borderBottom = "1px solid rgb(221, 213, 213)";
        ///// *** **** FLECHAS *** *** /////
        var arrowDown1 = document.getElementById("down1");
        arrowDown1.style.display = "none";
        var arrowUp1 = document.getElementById("up1");
        arrowUp1.style.display = "block";
    };
    MisComprasComponent.prototype.hideDetail1 = function () {
        ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
        var detail = document.getElementById("compra1");
        detail.style.display = "none";
        ///// *** **** SUBRAYADO *** *** /////
        var border = document.getElementById("cont-compra1");
        border.style.borderBottom = "none";
        ///// *** **** FLECHAS *** *** /////
        var arrowDown1 = document.getElementById("down1");
        arrowDown1.style.display = "block";
        var arrowUp1 = document.getElementById("up1");
        arrowUp1.style.display = "none";
    };
    MisComprasComponent.prototype.showDetail2 = function () {
        ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
        var detail = document.getElementById("compra2");
        detail.style.display = "block";
        ///// *** **** SUBRAYADO *** *** /////
        var border = document.getElementById("cont-compra2");
        border.style.borderBottom = "1px solid rgb(221, 213, 213)";
        ///// *** **** FLECHAS *** *** /////
        var arrowDown2 = document.getElementById("down2");
        arrowDown2.style.display = "none";
        var arrowUp2 = document.getElementById("up2");
        arrowUp2.style.display = "block";
    };
    MisComprasComponent.prototype.hideDetail2 = function () {
        ///// *** **** MOSTRAR DETALLE COMPRA *** *** /////
        var detail = document.getElementById("compra2");
        detail.style.display = "none";
        ///// *** **** SUBRAYADO *** *** /////
        var border = document.getElementById("cont-compra2");
        border.style.borderBottom = "none";
        ///// *** **** FLECHAS *** *** /////
        var arrowDown1 = document.getElementById("down2");
        arrowDown1.style.display = "block";
        var arrowUp1 = document.getElementById("up2");
        arrowUp1.style.display = "none";
    };
    MisComprasComponent = __decorate([
        core_1.Component({
            selector: 'app-mis-compras',
            templateUrl: './mis-compras.component.html',
            styleUrls: ['./mis-compras.component.scss']
        })
    ], MisComprasComponent);
    return MisComprasComponent;
}());
exports.MisComprasComponent = MisComprasComponent;
