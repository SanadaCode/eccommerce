import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/app/model/order';
import { OrderDetail } from 'src/app/model/order-detail';
import { OrderSeller } from 'src/app/model/order-seller';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {
  
  private url:string="http://localhost:8080/";
  
  constructor(private auth:AuthService,
    private http:HttpClient,
    private snackBar: MatSnackBar) { }
    
  getOrderOfUser():Promise<Order[]>{
    let url = this.url + "order/order";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString());
    return this.http.get<Order[]>(url,{params:param}).toPromise();
  }

  getOrderOfSeller():Promise<OrderSeller[]>{
    let url = this.url + "order/seller";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString());
    return this.http.get<OrderSeller[]>(url,{params:param}).toPromise();
  }

  getDetailOrder(orderId: number):Promise<OrderDetail[]>{
    let url = this.url + "order/detail";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("orderId", orderId.toString());
    return this.http.get<OrderDetail[]>(url,{params:param}).toPromise();
  }

  getCart(): OrderDetail[] | Promise<OrderDetail[]> {
    let url = this.url + "order/cart";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString());
    return this.http.get<OrderDetail[]>(url,{params:param}).toPromise();
  }

  addToCart(name:string, quantity:string){
    let url = this.url + "order/add";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("name", name)
    .append("quantity", quantity);
    return this.http.post<any>(url,null,{params: param}).toPromise().then(
      success => this.displayError(success.message)
    ).catch(
      error => this.displayError(error.error.message)
    );
  }

  changeQuantity(quantity: string,name:string) {
    let url = this.url + "order/change";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("name", name)
    .append("quantity", quantity);
    return this.http.put<any>(url,null,{params: param}).toPromise().then(
      success => this.displayError(success.message),
      error => this.displayError(error.error.message)
    );
  }

  deleteProductFromOrder(id: number) {
    let url = this.url + "order/cancel";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("orderId", id.toLocaleString());
    return this.http.delete<any>(url,{params: param}).toPromise().then(
      success => this.displayError(success.message),
      error => this.displayError(error.error.message)
    );;
  }

  confirmOrder() {
    let url = this.url + "order/confirm";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString());
    return this.http.put<any>(url,null,{params: param}).toPromise().then(
      success => this.displayError(success.message),
      error => this.displayError(error.error.message)
    );
  }

 sendOrder(id:number) {
    let url = this.url + "order/send";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("orderId", id.toString());
    return this.http.put<any>(url,null,{params: param}).toPromise();
  }
  
  deleteProductFromCart(name:string){
    let url = this.url + "order/delete";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("name", name);
    return this.http.delete<any>(url,{params: param}).toPromise().then(
      success => this.displayError(success.message),
      error => this.displayError(error.error.message)
    );
  }

  displayError(message:string){
    this.snackBar.open(message, "error", {
      duration: 2000,
    });
  }
}
