import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRestService } from '../service/order-rest.service';
import { OrderSeller } from 'src/app/model/order-seller';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/material/conferm/conferm.component';

@Component({
  selector: 'app-order-seller',
  templateUrl: './order-seller.component.html',
  styleUrls: ['./order-seller.component.css']
})
export class OrderSellerComponent implements OnInit {

  private orders:OrderSeller[]= null;
  private theOrders= new Subject<OrderSeller[]>();
  private flag = false;


  constructor(private orderService: OrderRestService,
    private route:Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.theOrders.subscribe(
      data => this.orders=data
    )
    this.getOrder();
    
  }
  
  async getOrder(){
    let data = await this.orderService.getOrderOfSeller();
    this.theOrders.next(data);
    $(document).ready( function () {
      console.log("dataTable")
      $('#table_order').DataTable(
        {
          "columnDefs": [
            { "orderable": false, "targets": 8 },
            { "orderable": false, "targets": 9}
          ]
        }
      );
    } );
    this.flag=true;
  }


  async sendProduct(id:number,result: boolean){
    if(result){
      await this.orderService.sendOrder(id);
      this.getOrder();

    }
  }

  async deleteProduct(id:number, result: boolean){
    if(result){
      await this.orderService.deleteProductFromOrder(id);
      this.getOrder();
    }
  }

  openDelete(id:number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.deleteProduct(id,result);
    });
  }

  openSend(id:number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.sendProduct(id,result);
    });
  }


}
