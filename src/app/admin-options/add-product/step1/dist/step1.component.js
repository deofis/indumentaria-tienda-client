"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Step1Component = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var marca_1 = require("src/app/products/clases/marca");
var forms_2 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var producto_1 = require("src/app/products/clases/producto");
var core_2 = require("@angular/core");
var Step1Component = /** @class */ (function () {
    function Step1Component(router, http, catalogoservice, fb, modal, productoService) {
        this.router = router;
        this.http = http;
        this.catalogoservice = catalogoservice;
        this.fb = fb;
        this.modal = modal;
        this.productoService = productoService;
        this.enviar = new core_2.EventEmitter();
        this.showForm2 = false;
        this.oferta = false;
        this.step2 = false;
        //nombres para los select
        this.marca = "-Marca-";
        this.categoria = "-Categoría-";
        this.subcategoria = "-Subcategoría-";
        this.unidad = "-Unidad de Medida-";
        this.selectedFile = null;
        this.fotosubir = null;
        // autocomplete
        this.autoControl = new forms_2.FormControl();
        this.marcas = [];
        this.newProduct = new producto_1.Producto();
        this.newBrand = new marca_1.Marca();
    }
    Step1Component.prototype.ngOnInit = function () {
        var _this = this;
        ///inicializar el fomulario
        this.crearForm();
        this.getUnidades();
        // get category list 
        this.getListaCategorias();
        // get brands
        this.getBrands();
        this.filteredBrands = this.form.controls.marca.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) {
            return _this._filter(value);
        }));
    };
    Step1Component.prototype.mostrarNombre = function (marca) {
        return marca ? marca.nombre : undefined;
    };
    /// *** ***  Formulario 1
    Step1Component.prototype.crearProducto = function () {
        var _this = this;
        if (this.form.invalid) {
            return this.form.markAllAsTouched();
        }
        this.newProduct.nombre = this.form.controls.nombre.value;
        this.newProduct.descripcion = this.form.controls.descripcion.value;
        this.newProduct.precio = this.form.controls.precio.value;
        //this.newProduct.precioOferta=this.form.controls.precioOferta.value;
        this.newProduct.disponibilidadGeneral = this.form.controls.disponibilidadGeneral.value;
        this.newProduct.destacado = this.form.controls.destacado.value;
        this.newProduct.marca = this.form.controls.marca.value;
        this.newProduct.subcategoria = this.form.controls.subcategoria.value;
        this.newProduct.unidadMedida = this.form.controls.unidadMedida.value;
        this.productoService.createNewProduct(this.newProduct).subscribe(function (response) {
            console.log(response);
            _this.newProduct.id = response.id;
            // Swal.fire({
            //   icon:"success",
            //   title:"Producto creado",
            //   text: `El producto ${response.nombre} ha sido creado con éxito!`
            // });
            _this.form.disable();
            var button = document.getElementById("btn-one");
            button.style.display = "none";
            var formImg = document.getElementById("form-img");
            formImg.style.display = "flex";
        }, function (err) {
            console.log(err);
        });
    };
    Step1Component.prototype.crearForm = function () {
        this.form = this.fb.group({
            id: [""],
            nombre: ["", forms_1.Validators.required],
            descripcion: [""],
            precio: ["", forms_1.Validators.required],
            precioOferta: [""],
            disponibilidadGeneral: [0],
            destacado: [false],
            marca: ["", forms_1.Validators.required],
            subcategoria: ["", forms_1.Validators.required],
            categoria: ["", forms_1.Validators.required],
            unidadMedida: ["", forms_1.Validators.required],
            checkoferta: [false]
        });
    };
    Object.defineProperty(Step1Component.prototype, "nombreInvalido", {
        // Getters para campos invalidos formulario 
        get: function () {
            return this.form.get('nombre').invalid && this.form.get('nombre').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Step1Component.prototype, "marcaInvalida", {
        get: function () {
            return this.form.get('marca').invalid && this.form.get('marca').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Step1Component.prototype, "subcategoriaInvalida", {
        get: function () {
            return this.form.get('subcategoria').touched && (this.form.controls.subcategoria.value == this.subcategoria);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Step1Component.prototype, "categoriaInvalida", {
        get: function () {
            return this.form.get('categoria').touched && (this.form.controls.categoria.value == this.categoria);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Step1Component.prototype, "unidadInvalida", {
        get: function () {
            return this.form.get('unidadMedida').touched && this.form.get('unidadMedida').value == this.unidad;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Step1Component.prototype, "precioInvalido", {
        get: function () {
            return this.form.get('precio').invalid && this.form.get('precio').touched;
        },
        enumerable: false,
        configurable: true
    });
    //// Upload imgs///////
    Step1Component.prototype.readUrl = function (event) {
        var _this = this;
        // console.log(event);
        this.selectedFile = event.target.files[0];
        // console.log(this.selectedFile)
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            document.getElementById("img-ppal").style.display = "block";
        }
    };
    Step1Component.prototype.cargarImagen = function () {
        this.productoService.uploadPhoto(this.selectedFile, this.newProduct.id)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    ///// *** *** STEP 1 **** *** ///
    Step1Component.prototype.showStep2 = function () {
        var step1 = document.getElementById("step1");
        step1.style.display = "none";
        this.step2 = true;
    };
    Step1Component.prototype.hasCombinations = function () {
        var btn = document.getElementById("btn-end1");
        var btn2 = document.getElementById("btn-end2");
        if (this.showForm2 == false) {
            btn.style.display = "none";
            btn2.style.display = "block";
            this.showForm2 = true;
        }
        else {
            btn.style.display = "block";
            btn2.style.display = "none";
            this.showForm2 = false;
        }
    };
    Step1Component.prototype.precioOferta = function () {
        var ofertaInput = document.getElementById("inputOferta");
        if (this.oferta == false) {
            ofertaInput.style.display = "flex";
            this.oferta = true;
        }
        else {
            ofertaInput.style.display = "none";
            this.oferta = false;
        }
    };
    Step1Component.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.marcas.filter(function (marca) { return marca.nombre.toLowerCase().indexOf(filterValue) === 0; });
    };
    /***** GET CATEGORIES *****/
    Step1Component.prototype.getListaCategorias = function () {
        var _this = this;
        this.catalogoservice.getListaCategorias().subscribe(function (response) {
            _this.categorias = response;
        });
    };
    Step1Component.prototype.getUnidades = function () {
        var _this = this;
        this.catalogoservice.getUnidades().subscribe(function (response) {
            _this.unidadesMedida = response;
        });
    };
    Step1Component.prototype.getBrands = function () {
        var _this = this;
        this.catalogoservice.getBrands().subscribe(function (response) {
            _this.marcas = response.marcas;
        });
    };
    Step1Component.prototype.showSubcategories = function () {
        var _this = this;
        this.categoriaSeleccionada = this.form.controls.categoria.value;
        this.catalogoservice.getSubcategoriasPorCategoria(this.categoriaSeleccionada.id)
            .subscribe(function (response) {
            _this.subcategorias = response.subcategorias;
        });
        var comboBoxSubcateories = document.getElementById("subcategories");
        comboBoxSubcateories.style.display = "block";
    };
    Step1Component.prototype.showUnit = function () {
        this.unidadSeleccionada = this.form.controls.unidadMedida.value;
        var unidad = document.getElementById("unidadElegida");
        if (this.unidadSeleccionada.nombre == "Unidad") {
            unidad.innerText = "unidades";
        }
        if (this.unidadSeleccionada.nombre == "Kilo") {
            unidad.innerText = "kilos";
        }
        if (this.unidadSeleccionada.nombre == "Litro") {
            unidad.innerText = "litros";
        }
    };
    Step1Component.prototype.changeUnit = function () {
        var inputDisponibilidad = document.getElementById("availability");
        var unidad = document.getElementById("unidadElegida");
        this.unidadSeleccionada = this.form.controls.unidadMedida.value;
        if (inputDisponibilidad.value == "1") {
            unidad.innerText = this.unidadSeleccionada.nombre;
        }
        else {
            this.showUnit();
        }
    };
    ///// MODAL  NUEVA MARCA////
    Step1Component.prototype.openCentrado = function (contenido) {
        this.modal.open(contenido, { centered: true });
    };
    Step1Component.prototype.addBrand = function () {
        var input = document.getElementById("marca");
        //lleno el objeto marca
        if (input.value !== "") {
            this.newBrand.id = 1;
            this.newBrand.nombre = input.value;
            //lo envio
            this.catalogoservice.addBrand(this.newBrand)
                .subscribe(function (response) {
                console.log(response);
            });
            //msj listo 
            var modal = document.getElementById("listo");
            modal.style.display = "block";
            var form = document.getElementById("form-add-brand");
            form.style.display = "none";
            var btn = document.getElementById("btn-brand");
            btn.style.display = "none";
            //escribo el input con la nueva marca
        }
        else {
            console.log("escribi algo lqdtm");
        }
    };
    __decorate([
        core_2.Output()
    ], Step1Component.prototype, "enviar");
    Step1Component = __decorate([
        core_1.Component({
            selector: 'app-step1',
            templateUrl: './step1.component.html',
            styleUrls: ['./step1.component.scss']
        })
    ], Step1Component);
    return Step1Component;
}());
exports.Step1Component = Step1Component;
