import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { UserDataService } from '../profile/service/user-data-service.service';
import { ProductsDataService } from './service/products-data.service';
import { OrderRestService } from '../order/service/order-rest.service';
import { Router } from '@angular/router';
import Sweet from 'sweetalert2/dist/sweetalert2.js';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  isLoggedIn: boolean; //flag per mostrare bottone aggiungi al carrello
  isSeller: boolean = false;
  dataTable;
  flag=true;
  isTable:boolean = false;
  showMessage:boolean=false;

  constructor(private productData: ProductsDataService,
    private userData: UserDataService,
    private order: OrderRestService,
    private router: Router) { }

  async ngOnInit() {
    if (localStorage.getItem("addToCart") != null) {
      if(localStorage.getItem("isLoggedIn") !=null ){
        if(!this.userData.isSeller()){
          await this.order.addToCart(localStorage.getItem("name"), localStorage.getItem("quantity")).then(
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
              });
         
        }
      }
      localStorage.removeItem("addToCart");
      localStorage.removeItem("name");
      localStorage.removeItem("quantity");
    }
    if(localStorage.getItem("isTable") != null){
      this.flag=false;
    }
    this.productData.reloadProduct();
    this.products = this.productData.getProducts();
    this.productData.theProducts.subscribe(
       data => {
       if(localStorage.getItem("isTable") != null){
         $('#dataTable').DataTable().destroy();
        }
        this.products = data
        this.showMessage=true;
       if(localStorage.getItem("isTable") != null){
         this.createTable()

        }
        this.isSeller = this.userData.isSeller();
        if (this.userData.isLoggedIn() && !this.userData.isSeller()) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    )
  }

  editProduct(product: Product) {
    this.productData.editMode = true;
    this.router.navigateByUrl("edit/" + product.productName);
  }

  deleteProduct(product: Product) {
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
        this.productData.deleteProduct(product.productName);
      }
    })
  }

  getTable(){
    this.isTable = true;
    this.flag=false;
    localStorage.setItem("isTable", "true");
      $(document).ready( function () {
        this.flag=false;
        $.fn.dataTable.ext.errMode="none";
        $('#dataTable').DataTable(
          {
            responsive: true,
            retrieve: true,
            "columnDefs": [
              { "orderable": false, "targets": 7 },
              { "orderable": false, "targets": 6},
              {"className": "dt-center", "targets": "_all"}
            
            ]
          }
        );
      } );
  }



  createTable(){
    $(document).ready( function () {
      this.flag=false;
      $.fn.dataTable.ext.errMode="none";
        $('#dataTable').DataTable(
          {
            "columnDefs": [
              { "orderable": false, "targets": 7 },
              { "orderable": false, "targets": 6},
              {"className": "dt-center", "targets": "_all"}
            
            ]
          }
        );
      } );
  }

  getCard(){
    this.isTable = false;
    this.flag=true;
    localStorage.removeItem("isTable");
  }
}
