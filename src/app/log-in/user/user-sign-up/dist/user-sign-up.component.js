"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSignUpComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var signup_request_1 = require("../../clases/signup.request");
var sweetalert2_1 = require("sweetalert2");
var UserSignUpComponent = /** @class */ (function () {
    function UserSignUpComponent(fb, router, catalogoservice, validadores, authService) {
        this.fb = fb;
        this.router = router;
        this.catalogoservice = catalogoservice;
        this.validadores = validadores;
        this.authService = authService;
        this.signupRequest = new signup_request_1.SignupRequest();
    }
    UserSignUpComponent.prototype.ngOnInit = function () {
        /***** mostrar mensaje cta creada */
        this.crearFormulario();
        this.getPaises();
    };
    ///////// obtener paises, estado ciudad ////
    UserSignUpComponent.prototype.getPaises = function () {
        var _this = this;
        this.catalogoservice.getPaises().subscribe(function (response) {
            _this.paises = response;
        });
    };
    UserSignUpComponent.prototype.showEstados = function () {
        var _this = this;
        var _a;
        this.paisSeleccionado = this.formRegistro.controls.cliente.get('direccion.pais').value;
        this.catalogoservice.getEstados((_a = this.paisSeleccionado) === null || _a === void 0 ? void 0 : _a.id).subscribe(function (response) {
            _this.estados = response;
        });
        var comboBoxEstados = document.getElementById("combobox-estados");
        comboBoxEstados.style.display = "block";
    };
    UserSignUpComponent.prototype.showCiudades = function () {
        var _this = this;
        var estadoSeleccionado = this.formRegistro.controls.cliente.get('direccion.estado').value;
        this.catalogoservice.getCiudades(estadoSeleccionado === null || estadoSeleccionado === void 0 ? void 0 : estadoSeleccionado.id, this.paisSeleccionado.id).subscribe(function (response) {
            _this.ciudades = response;
        });
        var comboBoxEstados = document.getElementById("combobox-ciudades");
        comboBoxEstados.style.display = "block";
    };
    //// ******** show psw *********///
    UserSignUpComponent.prototype.mostrarPsw1 = function () {
        var input = document.getElementById("new-pasw");
        if (input.type == "password") {
            input.type = "text";
            var icon = document.getElementById("show1");
            icon.style.visibility = "hidden";
            var iconHide = document.getElementById("hide1");
            iconHide.style.visibility = "visible";
        }
        else {
            input.type = "password";
            var icon = document.getElementById("show1");
            icon.style.visibility = "visible";
            var iconHide = document.getElementById("hide1");
            iconHide.style.visibility = "hidden";
        }
    };
    UserSignUpComponent.prototype.mostrarPsw2 = function () {
        var input = document.getElementById("new-pasw-repeat");
        if (input.type == "password") {
            input.type = "text";
            var icon = document.getElementById("show2");
            icon.style.visibility = "hidden";
            var iconHide = document.getElementById("hide2");
            iconHide.style.visibility = "visible";
        }
        else {
            input.type = "password";
            var icon = document.getElementById("show2");
            icon.style.visibility = "visible";
            var iconHide = document.getElementById("hide2");
            iconHide.style.visibility = "hidden";
        }
    };
    ///// show message
    UserSignUpComponent.prototype.showMessage = function () {
        var contRegistr = document.getElementById("ocultar");
        contRegistr.style.display = "none";
        var msj = document.getElementById("msje-registro");
        msj.style.display = "block";
    };
    /**
     * Crea el formulario a través de FormBuilder, con los campos:
     *                                        -email: obligatorio, patron de email @example.com
     *                                        -password: obligatorio
     */
    UserSignUpComponent.prototype.crearFormulario = function () {
        this.formRegistro = this.fb.group({
            // Expresion regular para verificar que sea un email correcto.
            email: ["", [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            passwordRepeat: ["", forms_1.Validators.required],
            checkterminos: ["", forms_1.Validators.required],
            cliente: this.fb.group({
                //id: [""],
                nombre: ["", forms_1.Validators.required],
                apellido: ["", forms_1.Validators.required],
                direccion: this.fb.group({
                    ciudad: ["", forms_1.Validators.required],
                    pais: ["", forms_1.Validators.required],
                    estado: [""],
                    calle: ["", forms_1.Validators.required],
                    numeroCalle: ["", forms_1.Validators.required],
                    piso: [""],
                    codigoPostal: ["", forms_1.Validators.required]
                })
            })
        }, {
            validators: this.validadores.passwordIguales('password', 'passwordRepeat')
        });
    };
    /**
     * Registra la nueva cuenta. Toma los datos de los campos del formulario, y si son validos, hace una peticion
     * POST a la API de registrar usuario para completar el registro.
     */
    UserSignUpComponent.prototype.registrarse = function () {
        /*
        if (this.formRegistro.invalid) {
          return Object.values(this.formRegistro.controls)
            .forEach(control => control.markAsTouched());
        }*/
        var _this = this;
        if (this.formRegistro.invalid) {
            return this.formRegistro.markAllAsTouched();
        }
        this.signupRequest.email = this.formRegistro.controls.email.value;
        this.signupRequest.password = this.formRegistro.controls.password.value;
        this.signupRequest.cliente = this.formRegistro.controls.cliente.value;
        //console.log(this.formRegistro);
        console.log(this.signupRequest);
        this.authService.signup(this.signupRequest).subscribe(function (response) {
            console.log(response);
            _this.showMessage();
        }, function (err) {
            sweetalert2_1["default"].fire({
                icon: 'warning',
                title: 'Usuario existente',
                text: "¡Ya existe el usuario!. Por favor,ingrese con su cuenta ó verifique su cuenta con su email.",
                showCloseButton: true,
                confirmButtonText: "Iniciar Sesión"
            }).then(function () {
                _this.router.navigate(['/login']);
            });
        });
    };
    Object.defineProperty(UserSignUpComponent.prototype, "nombreInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.nombre').invalid && this.formRegistro.get('cliente.nombre').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "apellidoInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.apellido').invalid && this.formRegistro.get('cliente.apellido').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "calleInvalida", {
        get: function () {
            return this.formRegistro.controls.cliente.get('direccion.calle').invalid && this.formRegistro.controls.cliente.get('direccion.calle').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "nroInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.direccion.numeroCalle').invalid && this.formRegistro.get('cliente.direccion.numeroCalle').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "cpInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.direccion.codigoPostal').invalid && this.formRegistro.get('cliente.direccion.codigoPostal').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "ciudadInvalida", {
        get: function () {
            return this.formRegistro.get('cliente.direccion.ciudad').invalid && this.formRegistro.get('cliente.direccion.ciudad').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "paisInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.direccion.pais').invalid && this.formRegistro.get('cliente.direccion.pais').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "estadoInvalido", {
        get: function () {
            return this.formRegistro.get('cliente.direccion.estado').invalid && this.formRegistro.get('cliente.direccion.estado').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "emailInvalido", {
        /**
         * Getter validador de email.
         * @return: true si el campo email es invalido y ha sido tocado.
         */
        get: function () {
            return this.formRegistro.get('email').invalid && this.formRegistro.get('email').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "terminosInvalido", {
        get: function () {
            return this.formRegistro.get('checkterminos').invalid && this.formRegistro.get('checkterminos').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "passwordInvalida", {
        /**
         * Getter validador de password.
         * @return: true si el campo password es invalido y ha sido tocado.
         */
        get: function () {
            return this.formRegistro.get('password').invalid && this.formRegistro.get('password').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserSignUpComponent.prototype, "passwordNoIguales", {
        /**
         * Getter validador de passwords iguales.
         * @return: true si las contraseñas NO son iguales.
         */
        get: function () {
            var pass1 = this.formRegistro.get('password').value;
            var pass2 = this.formRegistro.get('passwordRepeat').value;
            return (pass1 === pass2) ? false : true;
        },
        enumerable: false,
        configurable: true
    });
    UserSignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-user-sign-up',
            templateUrl: './user-sign-up.component.html',
            styleUrls: ['./user-sign-up.component.scss']
        })
    ], UserSignUpComponent);
    return UserSignUpComponent;
}());
exports.UserSignUpComponent = UserSignUpComponent;
