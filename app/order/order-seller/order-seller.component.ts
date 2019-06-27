import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import 'datatables.net';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { OrderSeller } from 'src/app/model/order-seller';
import Sweet from 'sweetalert2/dist/sweetalert2.js';
import { OrderRestService } from '../service/order-rest.service';
 

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
  private dataTable:boolean;

  constructor(private orderService: OrderRestService,
    private route:Router,
    private dialog: MatDialog) { }

   ngOnInit() {
    this.theOrders.subscribe(
      data => this.orders=data
    )
    this.dataTable=true;
    this.getOrder();
  }
  
  async getOrder(){
    console.log(this.dataTable);
    let data = await this.orderService.getOrderOfSeller();
    this.theOrders.next(data);
    if(this.dataTable) {
      console.log("qui")
      this.dataTable=false;
      $(document).ready( function () {
        this.table=$('#table_order').DataTable(
          {
            "columnDefs": [
              { "orderable": false, "targets": 8 },
              { "orderable": false, "targets": 9},
              {"className": "dt-center", "targets": "_all"}
            ]
          }
        );
      } );
    }else{
      $("#table_order").DataTable().destroy();
      $(document).ready( function () {
        this.table=$('#table_order').DataTable(
          {
            "columnDefs": [
              { "orderable": false, "targets": 8 },
              { "orderable": false, "targets": 9},
              {"className": "dt-center", "targets": "_all"}
            ]
          }
        );
        $('#example').removeClass( 'display' ).addClass('table table-striped table-bordered');
      } );
    }
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
    }).then(async (result) => {
      if (result.value) {
        await this.orderService.sendOrder(id).then((res) => {
          Sweet.fire(
            'Spedito!',
            res.message,
            'success'
          )
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
