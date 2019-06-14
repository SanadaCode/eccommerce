import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRestService } from '../service/order-rest.service';
import { OrderSeller } from 'src/app/model/order-seller';

@Component({
  selector: 'app-order-seller',
  templateUrl: './order-seller.component.html',
  styleUrls: ['./order-seller.component.css']
})
export class OrderSellerComponent implements OnInit {

  private orders:OrderSeller[]= null;


  constructor(private orderService: OrderRestService,
    private route:Router) { }

  ngOnInit() {
    this.getOrder();
    console.log("qua")
    
  }
  
  async getOrder(){
    this.orders = await this.orderService.getOrderOfSeller();
    console.log("quo")
  }

  getDetail(id:number){
    this.route.navigateByUrl("order/"+ id);
  }

  sendProduct(id:number){
    if(confirm("sei sicuro di aver inviato questo prodotto?")){
      this.orderService.sendOrder(id);
    }
  }

  deleteProduct(id:number){
    if(confirm("sei sicuro di voler annullare quest'ordine?")){
      this.orderService.deleteProductFromOrder(id);
    }
  }


}
