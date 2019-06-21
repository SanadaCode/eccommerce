import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderRestService } from '../service/order-rest.service';
import { OrderSeller } from 'src/app/model/order-seller';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'src/app/material/conferm/conferm.component';

import Sweet from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-order-seller',
  templateUrl: './order-seller.component.html',
  styleUrls: ['./order-seller.component.css']
})
export class OrderSellerComponent implements OnInit {

  private orders:OrderSeller[]= null;
  private theOrders= new Subject<OrderSeller[]>();
  private flag = false;
  private table;

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
    this.table=$(document).ready( function () {
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


  async sendProduct(id:number){
    Sweet.fire({
      title: 'Sei sicuro?',
      text: "Non potrai ritornare indietro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancellalo!'
    }).then(async (result) => {
      if (result.value) {
        await this.orderService.sendOrder(id).then((res) => {
          Sweet.fire(
            'Spedito!',
            res.message,
            'success'
          )
          this.table.destroy();
          this.getOrder();
        },
          (rej) => {
            Sweet.fire({
              type: 'error',
              title: 'Oops...',
              text: rej.error.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getOrder();
          })
      }
    })
    
  }

  async deleteProduct(id:number){
    Sweet.fire({
      title: 'Sei sicuro?',
      text: "Non potrai ritornare indietro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancellalo!'
    }).then(async (result) => {
      if (result.value) {
        await this.orderService.deleteProductFromOrder(id).then((res) => {
          Sweet.fire(
            'Cancellato!',
            res.message,
            'success'
          )
          this.table.destroy();
          this.getOrder();
        },
          (rej) => {
            Sweet.fire({
              type: 'error',
              title: 'Oops...',
              text: rej.error.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getOrder();
          })
      }
    })
    
  }
}
