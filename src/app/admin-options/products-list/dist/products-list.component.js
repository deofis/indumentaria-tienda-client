"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsListComponent = void 0;
var core_1 = require("@angular/core");
var ProductsListComponent = /** @class */ (function () {
    function ProductsListComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    ProductsListComponent.prototype.ngOnInit = function () {
    };
    ProductsListComponent.prototype.showDetail1 = function () {
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
    ProductsListComponent.prototype.hideDetail1 = function () {
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
    ProductsListComponent = __decorate([
        core_1.Component({
            selector: 'app-products-list',
            templateUrl: './products-list.component.html',
            styleUrls: ['./products-list.component.scss']
        })
    ], ProductsListComponent);
    return ProductsListComponent;
}());
exports.ProductsListComponent = ProductsListComponent;
