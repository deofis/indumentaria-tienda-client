"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropiedadesService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config/config");
var PropiedadesService = /** @class */ (function () {
    function PropiedadesService(http) {
        this.http = http;
        this.url = config_1.API_BASE_URL + "/api";
    }
    PropiedadesService.prototype.obtenerPropiedades = function () {
        return this.http.get(this.url + "/productos/propiedades").pipe(operators_1.map(function (resp) {
            return resp.propiedades;
        }));
    };
    ;
    PropiedadesService.prototype.obetenerCategorias = function () {
        return this.http.get(this.url + "/categorias").pipe(operators_1.map(function (resp) {
            return resp.categorias;
        }));
    };
    ;
    PropiedadesService.prototype.crearNuevaPropiedadProducto = function (propiedad, id) {
        return this.http.post(this.url + "/productos/" + id + "/propiedades", propiedad);
    };
    ;
    PropiedadesService.prototype.crearNuevaPropiedad = function (propiedad) {
        return this.http.post(this.url + "/productos/propiedades", propiedad);
    };
    ;
    PropiedadesService.prototype.crearNuevaPropiedadSubcategoria = function (propiedad, idSub) {
        return this.http.post(this.url + "/subcategorias/" + idSub + "/propiedades", propiedad);
    };
    ;
    PropiedadesService.prototype.modificarPropiedad = function (propiedad, id) {
        return this.http.put(this.url + "/productos/propiedades/" + id, propiedad);
    };
    ;
    PropiedadesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PropiedadesService);
    return PropiedadesService;
}());
exports.PropiedadesService = PropiedadesService;
