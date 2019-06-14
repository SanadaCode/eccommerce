import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderRestService } from './service/order-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private orders:Order[]= null;


  constructor(private orderService: OrderRestService,
    private route:Router) { }

  ngOnInit() {
    this.getOrder();
    
  }

  async getOrder(){
    this.orders = await this.orderService.getOrderOfUser();
    console.log(this.orders);
  }

  getDetail(id:number){
    this.route.navigateByUrl("order/"+ id);
  }

}
