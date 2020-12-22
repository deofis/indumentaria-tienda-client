"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var view_more_component_1 = require("./products/components/products/view-more/view-more.component");
var home_component_1 = require("./home/home.component");
var user_login_component_1 = require("./log-in/user/user-login/user-login.component");
var buscador_component_1 = require("./home/components/buscador/buscador.component");
var user_profile_component_1 = require("./user-options/user-profile/user-profile.component");
var user_sign_up_component_1 = require("./log-in/user/user-sign-up/user-sign-up.component");
var shopping_cart_component_1 = require("./cart/components/shopping-cart/shopping-cart.component");
var checkout_component_1 = require("./cart/components/checkout/checkout/checkout.component");
var pre_checkout_component_1 = require("./cart/components/checkout/pre-checkout/pre-checkout.component");
var confirm_data_component_1 = require("./cart/components/confirm-data/confirm-data.component");
var final_message_component_1 = require("./cart/components/final-message/final-message.component");
var oauth2_redirect_handler_component_1 = require("./log-in/oauth2/oauth2-redirect-handler/oauth2-redirect-handler.component");
var auth_guard_1 = require("./log-in/guards/auth.guard");
var role_guard_1 = require("./log-in/guards/role.guard");
var mis_compras_component_1 = require("./user-options/mis-compras/mis-compras.component");
var new_password_component_1 = require("./log-in/user/new-password/new-password.component");
var favorites_component_1 = require("./user-options/favorites/favorites.component");
var activated_mssg_component_1 = require("./log-in/user/activated-mssg/activated-mssg.component");
var admin_profile_component_1 = require("./admin-options/admin-profile/admin-profile.component");
var brands_panel_component_1 = require("./admin-options/brands-panel/brands-panel.component");
var products_list_component_1 = require("./admin-options/products-list/products-list.component");
var add_product_component_1 = require("./admin-options/add-product/add-product.component");
var admin_promos_component_1 = require("./admin-options/admin-promos/admin-promos.component");
var admin_ventas_component_1 = require("./admin-options/admin-ventas/admin-ventas.component");
var admin_propiedades_component_1 = require("./admin-options/admin-propiedades/admin-propiedades.component");
var admin = 'ROLE_ADMIN';
var user = 'ROLE_USER';
var routes = [
    { path: "home", component: home_component_1.HomeComponent },
    { path: "viewmore/:id", component: view_more_component_1.ViewMoreComponent },
    { path: "login", component: user_login_component_1.UserLoginComponent },
    { path: 'oauth2/redirect', component: oauth2_redirect_handler_component_1.Oauth2RedirectHandlerComponent },
    { path: "search/:termino", component: buscador_component_1.BuscadorComponent },
    // { path:"user-profile",component:UserProfileComponent},
    { path: "user-profile", component: user_profile_component_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: user } },
    { path: "user-my-purchases", component: mis_compras_component_1.MisComprasComponent },
    // { path:"user-my-purchases",component:MisComprasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: user} },
    { path: "user-favorites", component: favorites_component_1.FavoritesComponent },
    // { path:"user-favorites", component:FavoritesComponent, canActivate: [AuthGuard, RoleGuard], data: {role: user} },
    { path: "admin-profile", component: admin_profile_component_1.AdminProfileComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: admin } },
    { path: "brands-panel", component: brands_panel_component_1.BrandsPanelComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: admin } },
    { path: "sales", component: admin_ventas_component_1.AdminVentasComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: admin } },
    { path: "add-product", component: add_product_component_1.AddProductComponent },
    // { path:"add-product",component:AddProductComponent, canActivate: [AuthGuard, RoleGuard], data: {role: admin} },
    { path: "products-list", component: products_list_component_1.ProductsListComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: admin } },
    { path: "admin-promo", component: admin_promos_component_1.AdminPromosComponent /* , canActivate: [AuthGuard, RoleGuard], data: {role: admin} */ },
    { path: "admin-propiedades", component: admin_propiedades_component_1.AdminPropiedadesComponent, canActivate: [auth_guard_1.AuthGuard, role_guard_1.RoleGuard], data: { role: admin } },
    { path: "user-sign-up", component: user_sign_up_component_1.UserSignUpComponent },
    { path: "new-password", component: new_password_component_1.NewPasswordComponent },
    { path: "recuperar-password/:token", component: new_password_component_1.NewPasswordComponent },
    { path: "verify/redirect", component: activated_mssg_component_1.ActivatedMssgComponent },
    { path: "shopping-cart", component: shopping_cart_component_1.ShoppingCartComponent },
    // { path:"shopping-cart",component:ShoppingCartComponent, canActivate: [AuthGuard, RoleGuard], data: {role: user} },
    { path: "checkout", component: checkout_component_1.CheckoutComponent },
    { path: "pre-checkout", component: pre_checkout_component_1.PreCheckoutComponent },
    { path: "confirm-data", component: confirm_data_component_1.ConfirmDataComponent },
    { path: "successful-purchase", component: final_message_component_1.FinalMessageComponent },
    { path: "**", pathMatch: "full", redirectTo: "home" }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
