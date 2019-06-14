import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRestService } from './profile/service/user-rest.service';
import { UserDataService } from './profile/service/user-data-service.service';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProductRestService } from './products/service/product-rest.service';
import { ProductsDataService } from './products/service/products-data.service';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CartComponent } from './order/cart/cart.component';


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      LoginComponent,
      HomeComponent,
      SignupComponent,
      ProfileComponent,
      ShowProfileComponent,
      EditProfileComponent,
      ProductItemComponent,
      ProductsComponent,
      ProductEditComponent,
      OrderComponent,
      OrderDetailComponent,
      CartComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      LoginService,
      AuthGuardService,
      AuthService,
      UserRestService,
      UserDataService,
      ProductRestService,
      ProductsDataService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
