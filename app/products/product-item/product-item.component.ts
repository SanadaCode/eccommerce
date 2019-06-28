import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { OrderRestService } from 'src/app/order/service/order-rest.service';
import Sweet from 'sweetalert2/dist/sweetalert2.js';
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
    private snackBar: MatSnackBar,
    private sanitizer:DomSanitizer ) {
  }

  ngOnInit() {
  }
  
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' +this.product.img);
  }

  editProduct() {
    this.productData.editMode = true;
    this.router.navigateByUrl("edit/"+this.product.productName);
  }

  deleteProduct() {
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
        this.productData.deleteProduct(this.product.productName);
      }
    })
  }

  async addToCart(result: string){
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
      if(localStorage.getItem("isLoggedIn") != null){
        await this.orderService.addToCart(this.product.productName, quantity).then(
          (res) => {
            Sweet.fire(
              'Success!',
              res.message,
              'success'
            )
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
      }else{
        localStorage.setItem("addToCart","true");
        localStorage.setItem("name",this.product.productName);
        localStorage.setItem("quantity",quantity);
        this.router.navigateByUrl("login")
      }
    }
    
  }

}
