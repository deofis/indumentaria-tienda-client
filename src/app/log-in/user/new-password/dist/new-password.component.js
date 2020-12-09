"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var NewPasswordComponent = /** @class */ (function () {
    function NewPasswordComponent(fb, validadores, authService, activatedRoute, router) {
        this.fb = fb;
        this.validadores = validadores;
        this.authService = authService;
        this.activatedRoute = activatedRoute;
        this.router = router;
    }
    NewPasswordComponent.prototype.ngOnInit = function () {
        this.crearFormulario();
    };
    NewPasswordComponent.prototype.mostrarPsw = function () {
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
    NewPasswordComponent.prototype.mostrarPsw2 = function () {
        var input = document.getElementById("password2");
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
    NewPasswordComponent.prototype.crearFormulario = function () {
        this.formNewPassword = this.fb.group({
            password: ["", [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            passwordRepeat: ["", forms_1.Validators.required]
        }, {
            validators: this.validadores.passwordIguales('password', 'passwordRepeat')
        });
    };
    NewPasswordComponent.prototype.cambiarPassword = function () {
        var _this = this;
        var newPassword;
        newPassword = this.formNewPassword.controls.password.value;
        this.activatedRoute.params.subscribe(function (param) {
            var token = param.token;
            _this.authService.cambiarContraseña(newPassword, token).subscribe(function (response) {
                alert(response);
                _this.router.navigate(['login']);
            }, function (err) {
                alert(err.error);
                rxjs_1.throwError(err);
            });
        });
    };
    Object.defineProperty(NewPasswordComponent.prototype, "passwordInvalida", {
        get: function () {
            return this.formNewPassword.get('password').invalid && this.formNewPassword.get('password').touched;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NewPasswordComponent.prototype, "passwordNoIguales", {
        get: function () {
            var pass1 = this.formNewPassword.get('password').value;
            var pass2 = this.formNewPassword.get('passwordRepeat').value;
            return (pass1 === pass2) ? false : true;
        },
        enumerable: false,
        configurable: true
    });
    NewPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-new-password',
            templateUrl: './new-password.component.html',
            styleUrls: ['./new-password.component.scss']
        })
    ], NewPasswordComponent);
    return NewPasswordComponent;
}());
exports.NewPasswordComponent = NewPasswordComponent;
