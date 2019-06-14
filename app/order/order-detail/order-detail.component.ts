import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderRestService } from '../service/order-rest.service';
import { OrderDetail } from 'src/app/model/order-detail';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  private orders:OrderDetail[];

  constructor(private route: ActivatedRoute,
    private orderService:OrderRestService) { }

  ngOnInit() {
    this.route.params.subscribe(async (params) => 
       {this.orders= await this.orderService.getDetailOrder(params["id"]),
       console.log(this.orders);}
    )
  }

  changeQuantity(order:OrderDetail){
    let quantity=prompt("Inseriisci quantità", "0");
    if( /^\d+$/.test(quantity)){
      let message = this.orderService.changeQuantity(quantity,order.name.trim());
    }else{
      alert("Non è stata inserita la quantità corretta")
    }
  }


}
