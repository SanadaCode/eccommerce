import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { UserDataService } from '../profile/service/user-data-service.service';
import { ProductsDataService } from './service/products-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  isLoggedIn: boolean ; //flag per mostrare bottone aggiungi al carrello

  constructor(private productData: ProductsDataService,
    private userData: UserDataService) { }

  ngOnInit() {
    this.productData.reloadProduct();
    this.products = this.productData.getProducts();
    this.productData.theProducts.subscribe(
      data => {
        this.products = data
        if (this.userData.isLoggedIn() && !this.userData.isSeller()) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    )
    
  }

}
