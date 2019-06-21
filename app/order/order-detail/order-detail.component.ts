import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmComponent } from 'src/app/material/conferm/conferm.component';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderRestService } from '../service/order-rest.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  private orders:OrderDetail[];
  private theOrders = new Subject<OrderDetail[]>();
  private flag=true;

  constructor(private route: ActivatedRoute,
    private orderService:OrderRestService,
    private dialog :MatDialog) { }

  ngOnInit() {
    this.getOrder();
    this.theOrders.subscribe(
      data => this.orders=data
    )
    
  }

  getOrder(){
    this.route.params.subscribe(async (params) => 
       {let data= await this.orderService.getDetailOrder(params["id"]);
      this.theOrders.next(data);
      this.flag=false;}
    )
  }

  async deleteProduct(order:OrderDetail , result:boolean){
    if(result){
      await this.orderService.deleteProductFromOrder(order.id);
      this.getOrder();
    }
  }

  
  openConfirm(order:OrderDetail): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.deleteProduct(order,result);
    });
  }


  private setState(state: string){
  }


}
