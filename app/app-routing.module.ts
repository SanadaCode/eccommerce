import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { SellerGuardService } from './auth/seller-guard.service';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CartComponent } from './order/cart/cart.component';
import { OrderSellerComponent } from './order/order-seller/order-seller.component';
import { UploadComponent } from './file/upload/upload.component';

const routes: Routes = [
  { path: 'bella', component: ProductsComponent, canActivate: [AuthGuardService] },
  { path: 'upload', component: UploadComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "profile", component: ProfileComponent, canActivate: [AuthGuardService], children: [
      { path: "show", component: ShowProfileComponent },
      { path: "edit", component: EditProfileComponent }
    ]
  },
  
  { path: "edit", component: ProductEditComponent , canActivate: [SellerGuardService] },
  {
    path: "", component: HomeComponent, children: [
      { path: "", component: ProductsComponent },
      { path: "edit/:name", component: ProductEditComponent , canActivate: [SellerGuardService] },
      { path: "seller", component: ProductsComponent , canActivate: [SellerGuardService] }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "order", component: OrderComponent},
  { path: "vendor", component: OrderSellerComponent},
  { path: "order/:id", component: OrderDetailComponent},
  { path: "cart", component: CartComponent},
  { path: "edit", component: ProductEditComponent , canActivate: [SellerGuardService] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
