import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { UploadComponent } from './file/upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/service/login.service';
import { ConfirmComponent } from './material/conferm/conferm.component';
import { DialogComponent } from './material/dialog/dialog.component';
import { CartComponent } from './order/cart/cart.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderSellerComponent } from './order/order-seller/order-seller.component';
import { OrderComponent } from './order/order.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductsComponent } from './products/products.component';
import { ProductRestService } from './products/service/product-rest.service';
import { ProductsDataService } from './products/service/products-data.service';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDataService } from './profile/service/user-data-service.service';
import { UserRestService } from './profile/service/user-rest.service';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { SignupComponent } from './signup/signup.component';




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
      CartComponent,
      OrderSellerComponent,
      DialogComponent,
      ConfirmComponent,
      UploadComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      SweetAlert2Module.forRoot({
         buttonsStyling: false,
         customClass: 'modal-content',
         confirmButtonClass: 'btn btn-primary',
         cancelButtonClass: 'btn'
     })
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
   ],
   entryComponents: [DialogComponent,ConfirmComponent]
})
export class AppModule { }
