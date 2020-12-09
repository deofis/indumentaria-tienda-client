"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BrandsPanelComponent = void 0;
var core_1 = require("@angular/core");
var BrandsPanelComponent = /** @class */ (function () {
    function BrandsPanelComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.brands = ["Samsung", "Iphone", "Motorola", "Nokia", "Lenovo"];
    }
    BrandsPanelComponent.prototype.ngOnInit = function () {
    };
    /// *** **** NEW BRAND **** **** ///
    BrandsPanelComponent.prototype.showInput = function () {
        var input = document.getElementById("newBrand");
        input.style.display = "flex";
        input.style.justifyContent = "space-between";
        input.style.alignItems = "center";
        var option = document.getElementById("add");
        option.style.display = "none";
    };
    BrandsPanelComponent.prototype.addBrand = function (brand) {
        brand = brand.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        this.brands.push(brand);
        var input = document.getElementById("input");
        input.value = " ";
    };
    BrandsPanelComponent = __decorate([
        core_1.Component({
            selector: 'app-brands-panel',
            templateUrl: './brands-panel.component.html',
            styleUrls: ['./brands-panel.component.scss']
        })
    ], BrandsPanelComponent);
    return BrandsPanelComponent;
}());
exports.BrandsPanelComponent = BrandsPanelComponent;
