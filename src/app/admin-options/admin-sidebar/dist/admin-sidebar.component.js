"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminSidebarComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AdminSidebarComponent = /** @class */ (function () {
    function AdminSidebarComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AdminSidebarComponent.prototype.ngOnInit = function () {
    };
    AdminSidebarComponent.prototype.showLateralMenu = function () {
        if (screen.width > 650) {
            var lateralmenu = document.getElementById("lateralMenu");
            lateralmenu.style.width = "200px";
            var menu = document.getElementById("lateral-container");
            menu.style.display = "block";
            var arrow = document.getElementById("botonMenu");
            arrow.style.display = "none";
        }
        else {
            var lateralmenu = document.getElementById("lateralMenu");
            lateralmenu.style.opacity = "0.9";
            lateralmenu.style.width = "100%";
            var menu = document.getElementById("lateral-container");
            menu.style.display = "block";
            var close = document.getElementById("close-menu");
            close.style.display = "block";
            close.style.marginLeft = "15px";
            close.style.fontSize = "0.8em";
            var arrow = document.getElementById("open-menu");
            arrow.style.display = "none";
        }
    };
    AdminSidebarComponent.prototype.hiddeLateralMenu = function () {
        var lateralmenu = document.getElementById("lateralMenu");
        lateralmenu.style.width = "30px";
        var menu = document.getElementById("lateral-container");
        menu.style.display = "none";
        var boton = document.getElementById("botonMenu");
        boton.style.display = "block";
        var close = document.getElementById("close-menu");
        close.style.display = "none";
        var arrow = document.getElementById("open-menu");
        arrow.style.display = "block";
    };
    AdminSidebarComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout().subscribe(function (response) {
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Sesión Cerrada',
                text: response,
                width: '350px'
            }).then(function () { return _this.router.navigate(['/home']); });
        });
    };
    AdminSidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-sidebar',
            templateUrl: './admin-sidebar.component.html',
            styleUrls: ['./admin-sidebar.component.scss']
        })
    ], AdminSidebarComponent);
    return AdminSidebarComponent;
}());
exports.AdminSidebarComponent = AdminSidebarComponent;
