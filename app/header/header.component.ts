import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductsDataService } from '../products/service/products-data.service';
import { UserDataService } from '../profile/service/user-data-service.service';
import { SellerGuardService } from '../auth/seller-guard.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private user: UserDataService,
    private productService: ProductsDataService,
    private sellerGuard: SellerGuardService,
    private guard: AuthGuardService,
    private router: Router,
    private sanitizer:DomSanitizer) { }

  ngOnInit() {
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' +this.user.info.image);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.reloadProduct();
    this.authService.logout();
  }

  reloadProduct() {
    event.preventDefault();
    this.productService.reloadProduct();
    this.router.navigateByUrl('/');
  }

  addProduct() {
    event.preventDefault();
    this.productService.editMode = false;
    this.productService.product = null;
    this.router.navigateByUrl('/edit');
  }

  getOrder(){
    if(this.user.isSeller()){
      this.router.navigateByUrl("/vendor")
    }else{
      this.router.navigateByUrl("order")
    }
  }
}
