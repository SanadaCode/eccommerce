import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/model/product';
import { UserDataService } from 'src/app/profile/service/user-data-service.service';
import { ProductRestService } from './product-rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  
  products: Product[];
  theProducts: Subject<Product[]>;
  editMode: boolean;
  product: Subject<Product>;
  seller: boolean;
  

  constructor(private productService: ProductRestService,
    private auth: AuthService,
    private userData: UserDataService,
    private router: Router) {
    this.theProducts = new Subject<Product[]>();
    this.product = new Subject<Product>();
    
  }


  ngOnInit(): void {
  }

  reloadProduct() {
    if(!this.userData.isLoggedIn()){
      this.productService.getAllProducts(this.auth.getId()).subscribe(
        data => { this.theProducts.next(data), this.seller=false},
        error => console.log(error)
        )
      }else if(this.userData.isSeller()){
        this.searchProductBySeller();
      }else{
        this.productService.getAllProducts(this.auth.getId()).subscribe(
        data => { this.theProducts.next(data), this.seller=false},
        error => console.log(error)
      )
    }

  }

  getProducts() {
    if (this.products != null) {
      return this.products.slice();
    }
  }

  searchProductByName(name: string) {
    if (name == "" || name == null) {
      this.reloadProduct()
    } else {
      this.productService.getProductByName(name).subscribe(
        data => {
        this.products = [];
          this.product.next(data[0]);
          this.theProducts.next(data);
          this.seller= false;
        },
        error => alert(error.message)
      )
    }
  }

  searchProductBySeller() {
    if (this.userData.isSeller()) {
      this.productService.searchProductBySeller(this.auth.getId()).subscribe(
        data => { this.theProducts.next(data), this.seller= true, this.router.navigateByUrl("/seller")},
        error => console.log(error.message)
      )
    }
  }

  editProduct(product: Product, name: string) {
    if (this.userData.isSeller()) {
      this.productService.editProduct(this.auth.getId(), name, product).subscribe(
        data => {this.editMode=false; this.seller=false;this.router.navigateByUrl("/")},
        error => alert(error.message)
      )
    }
  }

  addProduct(product: Product) {
    if (this.userData.isSeller()) {
      this.productService.addProduct(this.auth.getId(), product).subscribe(
        data => 
        error => alert(error.message)
      )
    }
  }

  deleteProduct( name: string) {
    if (this.userData.isSeller()) {
      this.productService.deleteProduct(this.auth.getId(), name).subscribe(
        data => this.router.navigateByUrl("/"),
        error => alert(error.message)
      )
    }
  }

}
