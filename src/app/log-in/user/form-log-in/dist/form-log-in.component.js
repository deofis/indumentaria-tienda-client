"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormLogInComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var login_request_1 = require("../../clases/login-request");
var config_1 = require("../../../config/config");
var FormLogInComponent = /** @class */ (function () {
    function FormLogInComponent(authService, fb, router) {
        this.authService = authService;
        this.fb = fb;
        this.router = router;
        this.GOOGLE_AUTH_URL = config_1.GOOGLE_AUTH_URL;
        this.FACEBOOK_AUTH_URL = config_1.FACEBOOK_AUTH_URL;
        this.usuario = new login_request_1.IniciarSesionRequest();
    }
    FormLogInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.crearForms();
        //// OLVIDE MI CONTRASENA
        var recuperar = document.getElementById("recuperar");
        recuperar.addEventListener("click", function () {
            // ocultar form inicio de sesion
            _this.hiddeForm();
            //mostrar contenedor recuperar contrasena
            var uno = document.getElementById("contenedor-forgot-psw");
            uno.style.display = "flex";
            uno.style.flexDirection = "column";
            uno.style.justifyContent = "space-around";
            uno.style.alignItems = "center";
        });
        ///VOLVER ATRAS
        var arrow1 = document.getElementById("back");
        arrow1.addEventListener("click", this["return"]);
    };
    FormLogInComponent.prototype.crearForms = function () {
        this.formLogin = this.fb.group({
            email: ["", [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            password: ["", forms_1.Validators.required]
        });
        this.formOlvidePass = this.fb.group({
            email: ["", [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
        });
    };
    /**
     * Inicia una petición a la API para iniciar sesión, si las credenciales son válidas, nos devuelve los datos de
     * inicio de sesión: JWT, email y rol del usuario, refresh token para iniciar sesion automaticamente y timestamp
     * de expiración del JWT.
     */
    FormLogInComponent.prototype.iniciarSesion = function () {
        var _this = this;
        if (this.formLogin.invalid) {
            return Object.values(this.formLogin.controls)
                .forEach(function (control) { return control.markAsTouched(); });
        }
        this.usuario.email = this.formLogin.controls.email.value;
        this.usuario.password = this.formLogin.controls.password.value;
        this.authService.login(this.usuario).subscribe(function (response) {
            _this.router.navigate(['home']);
        }, function (err) {
            alert('Bad Credentials');
            console.log(err);
        });
    };
    FormLogInComponent.prototype.enviarRecuperarPassword = function () {
        if (this.formOlvidePass.invalid) {
            return Object.values(this.formOlvidePass.controls)
                .forEach(function (control) { return control.markAsTouched(); });
        }
        var userEmail;
        userEmail = this.formOlvidePass.controls.email.value;
        this.authService.recuperarContraseña(userEmail).subscribe(function (response) {
            alert(response);
            window.location.reload();
        }, function (err) {
            alert(err.error);
        });
    };
    Object.defineProperty(FormLogInComponent.prototype, "emailInvalido", {
        // Getters para campos invalidos formulario login
        get: function () {
            return this.formLogin.get('email').invalid && this.formLogin.get('email').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormLogInComponent.prototype, "passwordInvalida", {
        get: function () {
            return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormLogInComponent.prototype, "emailInvalidoPass", {
        // Getters para campos invalidos formulario olvide pass
        get: function () {
            return this.formOlvidePass.get('email').invalid && this.formOlvidePass.get('email').touched;
        },
        enumerable: false,
        configurable: true
    });
    FormLogInComponent.prototype.mostrarPsw = function () {
        var input = document.getElementById("password");
        if (input.type == "password") {
            input.type = "text";
            var icon = document.getElementById("show");
            icon.style.visibility = "hidden";
            var iconHide = document.getElementById("hide");
            iconHide.style.visibility = "visible";
        }
        else {
            input.type = "password";
            var icon = document.getElementById("show");
            icon.style.visibility = "visible";
            var iconHide = document.getElementById("hide");
            iconHide.style.visibility = "hidden";
        }
    };
    /// metodo para ocultar el formulario de inicio de sesion
    FormLogInComponent.prototype.hiddeForm = function () {
        var uno = document.getElementById("is-uno");
        var dos = document.getElementById("is-dos");
        var tres = document.getElementById("is-tres");
        uno.style.display = "none";
        dos.style.display = "none";
        tres.style.display = "none";
    };
    //FIN ocultar formulario inicio de sesion
    ///inicio metodo para ir atras con la flecha
    FormLogInComponent.prototype["return"] = function () {
        //ocultar
        var contForgotPsw = document.getElementById("contenedor-forgot-psw");
        contForgotPsw.style.display = "none";
        //mostrar inicio de sesion
        var uno = document.getElementById("is-uno");
        var dos = document.getElementById("is-dos");
        var tres = document.getElementById("is-tres");
        uno.style.display = "flex";
        uno.style.flexDirection = "column";
        uno.style.justifyContent = "space-around";
        uno.style.alignItems = "center";
        dos.style.display = "flex";
        dos.style.justifyContent = "space-between";
        dos.style.alignItems = "center";
        tres.style.display = "flex";
        tres.style.flexDirection = "column";
        tres.style.justifyContent = "space-between";
        tres.style.alignItems = "center";
    };
    FormLogInComponent = __decorate([
        core_1.Component({
            selector: 'app-form-log-in',
            templateUrl: './form-log-in.component.html',
            styleUrls: ['./form-log-in.component.scss']
        })
    ], FormLogInComponent);
    return FormLogInComponent;
}());
exports.FormLogInComponent = FormLogInComponent;
