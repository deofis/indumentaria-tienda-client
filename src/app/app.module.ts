import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token-interceptor';
import { BannerComponent } from './home/components/banner/banner.component';
import { AsideComponent } from './home/components/aside/aside.component';
import { ProductsComponent } from './products/components/products/products.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import Popper from 'popper.js';
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BuscadorComponent } from './home/components/buscador/buscador.component';
import { NormalHeaderComponent } from './shared/components/headers/normal-header/normal-header.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-options/user-profile/user-profile.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { ViewMoreComponent } from './products/components/products/view-more/view-more.component';
import { CardCarouselComponent } from './products/components/products/card-carousel/card-carousel.component';
import { CardGridComponent } from './products/components/products/card-grid/card-grid.component';
import { UserLoginComponent } from './log-in/user/user-login/user-login.component';
import { UserSignUpComponent } from './log-in/user/user-sign-up/user-sign-up.component';
import { Oauth2RedirectHandlerComponent } from './log-in/oauth2/oauth2-redirect-handler/oauth2-redirect-handler.component';
import { PruebaComponent } from './prueba/prueba/prueba.component';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './cart/components/checkout/checkout/checkout.component';
import { PreCheckoutComponent } from './cart/components/checkout/pre-checkout/pre-checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BenefitsRowComponent } from './benefits-row/benefits-row/benefits-row.component';
import { FormLogInComponent } from './log-in/user/form-log-in/form-log-in.component';
import { MisComprasComponent } from './user-options/mis-compras/mis-compras.component';
import { NewPasswordComponent } from './log-in/user/new-password/new-password.component';
import { FavoritesComponent } from './user-options/favorites/favorites.component';





@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AsideComponent,
    FooterComponent,
    ProductsComponent,
    HomeComponent,
    BuscadorComponent,
    NormalHeaderComponent,
    UserProfileComponent,
    AdminProfileComponent,
    ViewMoreComponent,
    CardCarouselComponent,
    CardGridComponent,
    UserLoginComponent,
    UserSignUpComponent,
    Oauth2RedirectHandlerComponent,
    PruebaComponent,
    BenefitsRowComponent,
    PreCheckoutComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    FormLogInComponent,
    MisComprasComponent,
    NewPasswordComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
