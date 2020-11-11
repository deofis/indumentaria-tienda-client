import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMoreComponent } from './products/components/products/view-more/view-more.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './log-in/user/user-login/user-login.component';
import { BuscadorComponent } from './home/components/buscador/buscador.component';
import { UserProfileComponent } from './user-options/user-profile/user-profile.component';
import { UserSignUpComponent } from './log-in/user/user-sign-up/user-sign-up.component';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './cart/components/checkout/checkout/checkout.component';
import { PreCheckoutComponent } from './cart/components/checkout/pre-checkout/pre-checkout.component';
import { Oauth2RedirectHandlerComponent } from './log-in/oauth2/oauth2-redirect-handler/oauth2-redirect-handler.component';
import { PruebaComponent } from './prueba/prueba/prueba.component';
import { AuthGuard } from './log-in/guards/auth.guard';
import { RoleGuard } from './log-in/guards/role.guard';
import { MisComprasComponent } from './user-options/mis-compras/mis-compras.component';
import {  NewPasswordComponent} from "./log-in/user/new-password/new-password.component";
import { FavoritesComponent } from './user-options/favorites/favorites.component';

const routes: Routes = [
{path:"home",component:HomeComponent},
{path:"viewmore/:id", component:ViewMoreComponent},
{path:"userLogIn", component:UserLoginComponent},
{path:"new-password",component:NewPasswordComponent},
{path:'oauth2/redirect', component: Oauth2RedirectHandlerComponent},
{path:"search/:termino", component:BuscadorComponent},
{path:"user-profile",component:UserProfileComponent},
{path:"user-my-purchases",component:MisComprasComponent},
{path:"user-favorites", component:FavoritesComponent},
{path:"user-sign-up",component:UserSignUpComponent},
{path:"shopping-cart",component:ShoppingCartComponent},
{path:"checkout",component:CheckoutComponent},
{path:"pre-checkout", component:PreCheckoutComponent},
{path:'test', component: PruebaComponent, canActivate: [AuthGuard]},
{path:"**", pathMatch:"full", redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
