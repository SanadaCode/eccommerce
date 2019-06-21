import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConfirmComponent } from 'src/app/material/conferm/conferm.component';
import { DialogComponent } from 'src/app/material/dialog/dialog.component';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderRestService } from '../service/order-rest.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private orders: OrderDetail[];
  private theOrders = new Subject<OrderDetail[]>();
  private flag = false;
  private message :string = "Quantità errata";
  private total:number = 0;

  constructor(private route: Router,
    private orderService: OrderRestService, public dialog: MatDialog,
    private snackBar:MatSnackBar) { }

    ngOnInit() {
    this.getCart()
      this.theOrders.subscribe(
        data => {
          this.orders = data;
          this.total=0;
         this.orders.forEach(element => {
            this.total=this.total + element.quantity * element.price;
          });
        }
      )
      if(localStorage.getItem("add") != null){
        this.orderService.confirmOrder();
        localStorage.removeItem("add");
      }
  }

  async getCart() {
    let data = await this.orderService.getCart();
    this.theOrders.next(data);
    this.flag=true;
  }

  async onConfirm(result:boolean) {
    if(result){
      await this.orderService.confirmOrder();
      this.getCart();
      this.route.navigateByUrl("/");
    }
  }

  async changeQuantity(order: OrderDetail, quantity: string) {
    if (/^\d+$/.test(quantity)) {
      await this.orderService.changeQuantity(quantity, order.name.trim());
      this.getCart();
    } else if(quantity != null){
       this.displayError(this.message);
    }
  }

  async deleteProduct(name: string, result: boolean) {
    if (result) {
      await this.orderService.deleteProductFromCart(name);
      this.getCart();
    }
  }

  openDialog(order:OrderDetail): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.changeQuantity(order,result);
    });

  }

  openConfirm(): void {
    let user= localStorage.getItem("firstName");
    if(user != null){
      const dialogRef = this.dialog.open(ConfirmComponent, {
        height: '300px',
        width: '250px'
      })
      dialogRef.afterClosed().subscribe(result => {
        this.onConfirm(result);
      });
    }else{
      console.log("qui")
      localStorage.setItem("add", "true");
      this.route.navigateByUrl("profile/edit");
      
    }
    
  }

  openDelete(name: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.deleteProduct(name,result);
    });
  }

  
  displayError(message:string){
    this.snackBar.open(message, "error", {
      duration: 20000,
    });
  }

}
