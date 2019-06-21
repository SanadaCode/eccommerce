import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmComponent } from 'src/app/material/conferm/conferm.component';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderRestService } from '../service/order-rest.service';
import Sweet from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  private orders: OrderDetail[];
  private theOrders = new Subject<OrderDetail[]>();
  private flag = true;

  constructor(private route: ActivatedRoute,
    private orderService: OrderRestService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getOrder();
    this.theOrders.subscribe(
      data => this.orders = data
    )

  }

  getOrder() {
    this.route.params.subscribe(async (params) => {
      let data = await this.orderService.getDetailOrder(params["id"]);
      this.theOrders.next(data);
      this.flag = false;
    }
    )
  }

  async deleteProduct(order: OrderDetail) {
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
        await this.orderService.deleteProductFromOrder(order.id).then((res) => {
          Sweet.fire(
            'Cancellato!',
            'Il prodottto è stato tolto dall\'ordine.',
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
