import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  
  private url: string = "http://localhost:8080/";
  
  constructor(private http: HttpClient) { }
  
  findProductByName(name: string): Product | PromiseLike<Product> {
    let url: string = this.url + "product/find";
    let params = new HttpParams().append('name', name);
    return this.http.get<any>(url, {params: params}).toPromise();
  }

  searchProductBySeller(id: number) {
    let url:string =this.url + "product/seller";
    let params = new HttpParams().append('id', id.toString());
    return this.http.get<any>(url, {params: params});
  }

  getAllProducts(id: number) {
    let url: string = this.url + "product/list";
    return this.http.get<any>(url);
  }
  
  getProductByName(name:string) {
    let url: string = this.url + "product/search";
    let params = new HttpParams().append('name', name);
    return this.http.get<any>(url, {params: params});
  }

  deleteProduct(id: number, name:string){
    let url: string = this.url + "product/delete";
    let params = new HttpParams()
    .append('id', id.toString())
    .append('name', name);
    return this.http.delete<any>(url,{params: params});
  }

  editProduct(id: number, name:string, product: Product, fileName:string , type:string){
    let url: string = this.url + "product/edit";
    let params = new HttpParams()
    .append('id', id.toString())
    .append('name', name)
    .append('nameFile', fileName)
    .append("type", type);
    console.log(fileName + type)
    return this.http.put<any>(url,product,{params: params});
  }

  addProduct(id: number, product: Product, name:string , type:string){
    let url: string = this.url + "product/add";
    let params = new HttpParams()
    .append('id', id.toString())
    .append("name", name)
    .append("type", type);
    return this.http.post<any>(url,product,{params: params});
  }

}
