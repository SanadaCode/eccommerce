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
  dataTable=true;
  isTable:boolean = false;

  constructor(private productData: ProductsDataService,
    private userData: UserDataService,
    private order: OrderRestService,
    private router: Router) { }

  async ngOnInit() {
    if (localStorage.getItem("addToCart") != null) {
      if(localStorage.getItem("isLoggedIn") !=null ){
        if(!this.userData.isSeller()){
          await this.order.addToCart(localStorage.getItem("name"), localStorage.getItem("quantity"));
        }
      }
      localStorage.removeItem("addToCart");
      localStorage.removeItem("name");
      localStorage.removeItem("quantity");
    }
    if(localStorage.getItem("isTable") != null){
      this.isTable=true;
    }
    this.productData.reloadProduct();
    this.products = this.productData.getProducts();
    this.productData.theProducts.subscribe(
      data => {
        this.products = data
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
    localStorage.setItem("isTable", "true");
      $(document).ready( function () {
        this.dataTable=false;
        this.table=$('#dataTable').DataTable(
          {
            "columnDefs": [
              { "orderable": false, "targets": 7 },
              { "orderable": false, "targets": 6},
              {"className": "dt-center", "targets": "_all"}
            ]
          }
        );
        $('#example').removeClass( 'display' ).addClass('table table-striped table-bordered');
      } );
  }

  getCard(){
    this.isTable = false;
    localStorage.removeItem("isTable");
  }
}
