import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductsDataService } from '../service/products-data.service';
import { OrderRestService } from 'src/app/order/service/order-rest.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() showButton: boolean;
  

  constructor(private productData: ProductsDataService,
    private orderService: OrderRestService,
    private router: Router) {
  }

  ngOnInit() {
  }

  editProduct() {
    this.productData.editMode = true;
    this.router.navigateByUrl("edit/"+this.product.productName);
  }

  deleteProduct() {
    this.productData.deleteProduct(this.product.productName);
  }

  addToCart(){
    let quantity=prompt("Inseriisci quantità", "0");
    if( /^\d+$/.test(quantity)){
      let message = this.orderService.addToCart(this.product.productName, quantity);
    }else{
      alert("Non è stata inserita la quantità corretta")
    }
  }

}
