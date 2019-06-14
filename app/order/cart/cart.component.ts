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
  
  onConfirm(){
    this.orderService.confirmOrder();
  }
  
  changeQuantity(order:OrderDetail){ 
    let quantity=prompt("Inseriisci quantità", "0");
    if( /^\d+$/.test(quantity)){
      this.orderService.changeQuantity(quantity,order.name.trim());
    }else{
      alert("Non è stata inserita la quantità corretta")
    }
  }
}
