import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { UserDataService } from '../profile/service/user-data-service.service';
import { ProductsDataService } from './service/products-data.service';
import { OrderRestService } from '../order/service/order-rest.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  isLoggedIn: boolean ; //flag per mostrare bottone aggiungi al carrello

  constructor(private productData: ProductsDataService,
    private userData: UserDataService,
    private order:OrderRestService) { }

  async ngOnInit() {
    if(localStorage.getItem("addToCart") != null){
        console.log("qui");
        await this.order.addToCart(localStorage.getItem("name"),localStorage.getItem("quantity"));
        localStorage.removeItem("addToCart");
        localStorage.removeItem("name");
        localStorage.removeItem("quantity");
      
    }
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
