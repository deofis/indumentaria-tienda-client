"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CatalogoService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var config_1 = require("src/app/config/config");
var CatalogoService = /** @class */ (function () {
    function CatalogoService(http) {
        this.http = http;
        this.url = config_1.API_BASE_URL + "/api";
    }
    CatalogoService.prototype.getProductosDestacados = function () {
        return this.http.get(this.url + "/catalogo/destacados").pipe(operators_1.map(function (response) { return response; }));
    };
    CatalogoService.prototype.getListaCategorias = function () {
        return this.http.get(this.url + "/catalogo/categorias").pipe(operators_1.map(function (response) { return response; }));
    };
    CatalogoService.prototype.getRdoBusqueda = function (termino) {
        var parametros = new http_1.HttpParams();
        parametros = parametros.append("termino", termino);
        return this.http.get(this.url + "/catalogo/buscar", { params: parametros }).pipe(operators_1.map(function (response) { return response; }));
    };
    CatalogoService.prototype.getInfoProducto = function (id) {
        return this.http.get(this.url + "/catalogo/productos/ver/" + id).pipe(operators_1.map(function (response) { return response.producto; }));
    };
    CatalogoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CatalogoService);
    return CatalogoService;
}());
exports.CatalogoService = CatalogoService;
