import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/material/dialog/dialog.component';
import { Product } from 'src/app/model/product';
import { OrderRestService } from 'src/app/order/service/order-rest.service';
import { ProductsDataService } from '../service/products-data.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() showButton: boolean;
  private message : string ="Quantità errata";

  constructor(private productData: ProductsDataService,
    private orderService: OrderRestService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  editProduct() {
    this.productData.editMode = true;
    this.router.navigateByUrl("edit/"+this.product.productName);
  }

  deleteProduct() {
    this.productData.deleteProduct(this.product.productName);
  }

  addToCart(result: string){
    
    if( /^\d+$/.test(result)){
      if(localStorage.getItem("isLoggedIn") != null){
        let message = this.orderService.addToCart(this.product.productName, result);
      }else{
        localStorage.setItem("addToCart","true");
        localStorage.setItem("name",this.product.productName);
        localStorage.setItem("quantity",result);
        this.router.navigateByUrl("login")
      }
    }else if(result != null){
      this.displayError(this.message);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '250px'
    })

    dialogRef.afterClosed().subscribe(result => {
      this.addToCart(result);
    });

  } 

  displayError(message:string){
    this.snackBar.open(message, "error", {
      duration: 20000,
    });
  }

}
