"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserHeaderComponent = void 0;
var core_1 = require("@angular/core");
var cart_1 = require("src/app/cart/clases/cart");
var UserHeaderComponent = /** @class */ (function () {
    function UserHeaderComponent(catalogoservice, router, _cartService) {
        this.catalogoservice = catalogoservice;
        this.router = router;
        this._cartService = _cartService;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.carrito = new cart_1.MockCarrito();
    }
    UserHeaderComponent.prototype.ngOnInit = function () {
        //to keep seeing the scroll and adjust the header opacity
        // window.addEventListener("scroll",this.headerEffect)
        // get category list 
        this.getListaCategorias();
        //cart counter
        /*
       this._cartService.currentDataCart$.subscribe(x=>{
        if(x) {
          this.items = x;
          this.totalQuantity = x.length;
           this.totalPrice = x.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
        }
          })
          */
    };
    /***** GET CATEGORIES *****/
    UserHeaderComponent.prototype.getListaCategorias = function () {
        var _this = this;
        this.catalogoservice.getListaCategorias().subscribe(function (response) {
            _this.categorias = response;
            console.log(response);
        });
    };
    /////end get categories///
    //   
    /********DROP DOWN MENUS */
    //***categories */
    UserHeaderComponent.prototype.showCategories = function () {
        var categoriesList = document.getElementById("categoriesList");
        categoriesList.style.display = "block";
        this.bgOpenMenu();
    };
    // showSubcategories(){
    // //  let containerSubcategories = document.getElementById("container-subcategories");
    // //  containerSubcategories.style.display="initial";
    // //  let categoriesList= document.getElementById("categoriesList");
    // //  categoriesList.style.borderBottomRightRadius="0px";
    // }
    UserHeaderComponent.prototype.hiddeSubAndCategories = function () {
        //   let containerSubcategories = document.getElementById("container-subcategories");
        //  containerSubcategories.style.display="none";
        var categoriesList = document.getElementById("categoriesList");
        categoriesList.style.display = "none";
        this.hiddeBgMenu();
    };
    ///****User options */
    UserHeaderComponent.prototype.showUserMenu = function () {
        var userOptions = document.getElementById("userOptions");
        userOptions.style.display = "block";
        this.bgOpenMenu();
    };
    UserHeaderComponent.prototype.hiddeUserMenu = function () {
        var userOptions = document.getElementById("userOptions");
        userOptions.style.display = "none";
        this.hiddeBgMenu();
    };
    /******* Background Menu */
    UserHeaderComponent.prototype.bgOpenMenu = function () {
        var bgCategories = document.getElementById("bg-menu");
        bgCategories.style.display = "block";
    };
    UserHeaderComponent.prototype.hiddeBgMenu = function () {
        var bgCategories = document.getElementById("bg-menu");
        bgCategories.style.display = "none";
    };
    /**** Search bar  ****/
    UserHeaderComponent.prototype.buscarProducto = function (termino) {
        this.router.navigate(['/search', termino]);
    };
    UserHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-user-header',
            templateUrl: './user-header.component.html',
            styleUrls: ['./user-header.component.scss']
        })
    ], UserHeaderComponent);
    return UserHeaderComponent;
}());
exports.UserHeaderComponent = UserHeaderComponent;
