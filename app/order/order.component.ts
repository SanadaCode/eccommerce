import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../model/order';
import { OrderRestService } from './service/order-rest.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private orders:Order[]= null;
  private flag=true;

  constructor(private orderService: OrderRestService,
    private route:Router) { }

  ngOnInit() {
    this.getOrder();
  }

  async getOrder(){
    this.orders = await this.orderService.getOrderOfUser();
    this.flag=false;
    $(document).ready( function () {
      $('#dataTable').DataTable(
        {
          "columnDefs": [
            { "orderable": false, "targets": 4 }
          ],
          
          
        }
      
      );
  } );
  }

  getDetail(id:number){
    this.route.navigateByUrl("order/"+ id);
  }

}