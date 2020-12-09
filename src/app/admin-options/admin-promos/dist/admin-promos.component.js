"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminPromosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var promocion_1 = require("../admin-promos/clases/promocion");
/**
 * @title Data table with sorting, pagination, and filtering.
 */
var AdminPromosComponent = /** @class */ (function () {
    function AdminPromosComponent(catalogoService, modalService, calendar, fb, productoService, validadores, router, authService) {
        this.catalogoService = catalogoService;
        this.modalService = modalService;
        this.calendar = calendar;
        this.fb = fb;
        this.productoService = productoService;
        this.validadores = validadores;
        this.router = router;
        this.authService = authService;
        this.productos = [];
        this.productosASeleccionar = [];
        this.productosSeleccionados = [];
        this.page_size = 10;
        this.page_number = 1;
        this.pageSizeOptions = [10, 20, 50];
        this.value = 'Ejemplo: Galaxy';
        this.filterPromos = '';
        this.filterSubcategorias = "";
        this.subcategorias = [];
        this.subASeleccionar = [];
        this.subSeleccionadas = [];
        this.infoFechaInicio = "Si no selecciona una fecha de inicio, por defecto será la actual.";
        this.date = new Date().toISOString().substring(0, 16); /* split(':')[0]; */
    }
    AdminPromosComponent.prototype.ngOnInit = function () {
        this.arrow = true;
        this.obtenerProductos();
        this.obetenerSubcategorias();
        this.crearFormularioPromSubcategoria();
        this.cargarFechaDesde();
        console.log(this.date);
        this.promociones = new promocion_1.Promocion();
    };
    //Funcionalidades para crear una nueva promocion segun subcategorias -- INICIO --
    AdminPromosComponent.prototype.crearFormularioPromSubcategoria = function () {
        this.formSubcategoria = this.fb.group({
            fechaDesde: [''],
            fechaHasta: ['', [forms_1.Validators.required]],
            porcentaje: ['', [forms_1.Validators.required, forms_1.Validators.max(90), forms_1.Validators.min(5)]]
        });
    };
    ;
    Object.defineProperty(AdminPromosComponent.prototype, "fechaDesdeInvalida", {
        get: function () {
            return this.formSubcategoria.get('fechaDesde');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminPromosComponent.prototype, "fechaHastaInvalida", {
        get: function () {
            return this.formSubcategoria.get('fechaHasta').invalid && this.formSubcategoria.get('fechaHasta').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdminPromosComponent.prototype, "porcentajeInvalido", {
        get: function () {
            return this.formSubcategoria.get('porcentaje').invalid && this.formSubcategoria.get('porcentaje').touched;
        },
        enumerable: false,
        configurable: true
    });
    AdminPromosComponent.prototype.cargarFechaDesde = function () {
        this.formSubcategoria.setValue({
            fechaDesde: this.date,
            fechaHasta: "",
            porcentaje: ""
        });
    };
    ;
    AdminPromosComponent.prototype.crearPromocion = function () {
        var _this = this;
        if (this.formSubcategoria.invalid) {
            return Object.values(this.formSubcategoria.controls).forEach(function (control) {
                if (control instanceof forms_1.FormGroup) {
                    Object.values(control.controls).forEach(function (control) { return control.markAsTouched(); });
                }
                else {
                    control.markAsTouched();
                }
            });
        }
        this.promociones.fechaDesde = this.formSubcategoria.controls.fechaDesde.value + "-03:00";
        this.promociones.fechaHasta = this.formSubcategoria.controls.fechaHasta.value + "-03:00";
        this.promociones.porcentaje = (this.formSubcategoria.controls.porcentaje.value / 100);
        console.log(this.promociones);
        if (this.subSeleccionadas.length > 1) {
            for (var index = 0; index < this.subSeleccionadas.length; index++) {
                this.productoService.crearNewPromotionSub(this.promociones, this.subSeleccionadas[index].id).subscribe(function (resp) {
                    console.log(resp);
                });
            }
        }
        else {
            this.productoService.crearNewPromotionSub(this.promociones, this.subSeleccionadas[0].id).subscribe(function (resp) {
                console.log(resp);
            });
        }
        this.catalogoService.getSubcategorias().subscribe(function (resp) {
            _this.subcategorias = resp;
            _this.subASeleccionar = resp;
        });
        this.subSeleccionadas = [];
        this.formSubcategoria.reset();
    };
    AdminPromosComponent.prototype.obetenerSubcategorias = function () {
        var _this = this;
        this.catalogoService.getSubcategorias().subscribe(function (resp) {
            _this.subcategorias = resp;
            _this.subASeleccionar = resp;
        });
    };
    AdminPromosComponent.prototype.anadirSub = function (i) {
        this.subSeleccionadas.push(this.subASeleccionar[i]);
        this.subASeleccionar.splice(i, 1);
    };
    AdminPromosComponent.prototype.eliminarSub = function (j) {
        this.subASeleccionar.push(this.subSeleccionadas[j]);
        this.subSeleccionadas.splice(j, 1);
    };
    AdminPromosComponent.prototype.reiniciar = function () {
        var _this = this;
        this.catalogoService.getSubcategorias().subscribe(function (resp) {
            _this.subcategorias = resp;
            _this.subASeleccionar = resp;
        });
        this.subSeleccionadas = [];
        this.formSubcategoria.reset();
    };
    // -- FINAL -- //
    // Funcionalidades para crear una nueva promocion segun producto -- INICIO -- //
    /* crearFormularioPromProducto(){
    
      this.formSubcategoria = this.fb.group({
        fechaDesde: [''],
        fechaHasta: ['', [Validators.required] ],
        precioOferta: [''],
        porcentaje: ['', [Validators.required, Validators.max(90), Validators.min(5) ] ]
      })
    }; */
    AdminPromosComponent.prototype.obtenerProductos = function () {
        var _this = this;
        this.catalogoService.getProductos().subscribe(function (resp) {
            _this.productos = resp;
            _this.productosASeleccionar = resp;
        });
    };
    ;
    AdminPromosComponent.prototype.anadirProducto = function (i) {
        this.productosSeleccionados.push(this.productosASeleccionar[i]);
        this.productosASeleccionar.splice(i, 1);
    };
    AdminPromosComponent.prototype.eliminarProducto = function (j) {
        this.productosASeleccionar.push(this.productosSeleccionados[j]);
        this.productosSeleccionados.splice(j, 1);
    };
    AdminPromosComponent.prototype.handlePage = function (e) {
        this.page_size = e.pageSize;
        this.page_number = e.pageIndex + 1;
    };
    //Modal nueva promoción
    AdminPromosComponent.prototype.open = function (contenido) {
        this.modalService.open(contenido, { size: 'xl', scrollable: true });
    };
    AdminPromosComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-promos',
            templateUrl: './admin-promos.component.html',
            styleUrls: ['./admin-promos.component.scss']
        })
    ], AdminPromosComponent);
    return AdminPromosComponent;
}());
exports.AdminPromosComponent = AdminPromosComponent;
