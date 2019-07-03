import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/model/product';
import { UserDataService } from 'src/app/profile/service/user-data-service.service';
import Sweet from 'sweetalert2/dist/sweetalert2.js';
import { ProductRestService } from './product-rest.service';


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
      this.productService.getAllProducts(this.auth.getId()).then(
        data => { this.theProducts.next(data), this.seller=false},
        error => this.message(error.message)
        )
      }else if(this.userData.isSeller()){
        this.searchProductBySeller();
      }else{
        this.productService.getAllProducts(this.auth.getId()).then(
        data => { this.theProducts.next(data), this.seller=false},
        error => this.message(error.error.message)
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
          this.theProducts.next(data);
          this.seller= false;
        },
        error => this.message(error.error.message)
      )
    }
  }

  searchProductBySeller() {
    if (this.userData.isSeller()) {
      this.productService.searchProductBySeller(this.auth.getId()).subscribe(
        data => { this.theProducts.next(data), this.seller= true, this.router.navigateByUrl("/seller")},
        error => this.message(error.error.message)
      )
    }
  }

  editProduct(product: Product, name: string, fileName: string , type:string) {
    if (this.userData.isSeller()) {
      this.productService.editProduct(this.auth.getId(), name, product, fileName, type).subscribe(
        data => {this.editMode=false; this.seller=false;this.router.navigateByUrl("/")},
        error => this.message(error.error.message)
      )
    }
  }

  addProduct(product: Product, name:string , type:string) {
    if (this.userData.isSeller()) {
      this.productService.addProduct(this.auth.getId(), product, name, type).subscribe(
        data => this.router.navigateByUrl("/"),
        error => this.message(error.error.message)
      )
    }
  }

  deleteProduct( name: string) {
    if (this.userData.isSeller()) {
      this.productService.deleteProduct(this.auth.getId(), name).then(
        data => {
          this.reloadProduct();
          Sweet.fire({
            type: 'success',
            title: 'Successo',
            text: "L'operazione è avvenuta con successo!",
            showConfirmButton: false,
            timer: 1500
          })
        }),
        error => {
          Sweet.fire({
            type: 'error',
            title: 'Oops...',
            text: error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
    }
  }

  message(message:string){
    Sweet.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
