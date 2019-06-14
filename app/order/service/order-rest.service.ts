import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from 'src/app/model/order';
import { OrderDetail } from 'src/app/model/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderRestService {
  
  private url:string="http://localhost:8080/";
  
  constructor(private auth:AuthService,
    private http:HttpClient) { }
    
  getOrderOfUser():Promise<Order[]>{
    let url = this.url + "order/order";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString());
    return this.http.get<Order[]>(url,{params:param}).toPromise();
  }

  getDetailOrder(orderId: number):Promise<OrderDetail[]>{
    let url = this.url + "order/detail";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("orderId", orderId.toString());
    return this.http.get<OrderDetail[]>(url,{params:param}).toPromise()
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
    return this.http.post<any>(url,null,{params: param}).toPromise();
  }

  changeQuantity(quantity: string,name:string) {
    let url = this.url + "order/change";
    let param:Params = new HttpParams().append("id",this.auth.getId().toString())
    .append("name", name)
    .append("quantity", quantity);
    return this.http.put<any>(url,null,{params: param}).toPromise();
  }
}
