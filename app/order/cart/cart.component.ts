import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/model/order-detail';
import { ActivatedRoute } from '@angular/router';
import { OrderRestService } from '../service/order-rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  private orders:OrderDetail[];

  constructor(private route: ActivatedRoute,
    private orderService:OrderRestService) { }

  ngOnInit() {
    this.getCart()
  }

  async getCart(){
    this.orders = await this.orderService.getCart();
  }
  
  
     
}
