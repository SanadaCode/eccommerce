import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrderDetail } from 'src/app/model/order-detail';
import Sweet from 'sweetalert2/dist/sweetalert2.js';
import { OrderRestService } from '../service/order-rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private orders: OrderDetail[];
  private theOrders = new Subject<OrderDetail[]>();
  private flag = false;
  private message: string = "Quantità errata";
  private total: number = 0;

  constructor(private route: Router,
    private orderService: OrderRestService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCart()
    this.theOrders.subscribe(
      data => {
        this.orders = data;
        this.total = 0;
        this.orders.forEach(element => {
          this.total = this.total + element.quantity * element.price;
        });
      }
    )
    if (localStorage.getItem("add") != null) {
      this.orderService.confirmOrder();
      localStorage.removeItem("add");
    }

  }

  async getCart() {
    let data = await this.orderService.getCart();
    this.theOrders.next(data);
    this.flag = true;
  }

  async onConfirm() {
    Sweet.fire({
      title: 'Conferma Carrello',
      text: "Sei sicuro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, conferma ordine!'
    }).then(async (result) => {
      if (result.value) {
        await await this.orderService.confirmOrder().then((res) => {
          Sweet.fire(
            'Successo!',
            res.message,
            'success'
          )
          this.getCart(); 
          this.route.navigateByUrl("/");
        },
          (rej) => {
            Sweet.fire({
              type: 'error',
              title: 'Oops...',
              text: rej.error.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getCart();
          })
      }
    })
  }

  async changeQuantity(order: OrderDetail) {
    const { value: quantity } = await Sweet.fire({
      title: 'Inserisci la quantità!',
      input: 'number',
      inputAttributes: {
        min: 1,
      },
      inputValidator: (value) => {
        if (value < 1) {
          return 'La nuova quantità deve essere almeno 1!'
        }
      },
      inputPlaceholder: 'Quantità'
    })
    if (quantity) {
      await this.orderService.changeQuantity(quantity, order.name.trim()).then(
        (res) => {
          Sweet.fire(
            'Success!',
            res.message,
            'success'
          )
          this.getCart();
        },
        (rej) => {
          Sweet.fire({
            position:"top-end",
            type: 'error',
            title: 'Oops...',
            text: rej.error.message,
            showConfirmButton: false,
            timer: 2000
          })
        })
    }
  }

  async deleteProduct(name: string) {
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
        await await this.orderService.deleteProductFromCart(name).then((res) => {
          Sweet.fire(
            'Cancellato!',
            'Il prodotto è stato tolto dal carrello.',
            'success'
          )
          this.getCart();
        },
          (rej) => {
            Sweet.fire({
              type: 'error',
              title: 'Oops...',
              text: rej.error.message,
              showConfirmButton: false,
              timer: 1500
            })
            this.getCart();
          })
      }
    })
  }

}
