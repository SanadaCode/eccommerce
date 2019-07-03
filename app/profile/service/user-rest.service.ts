import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getDefaultService } from 'selenium-webdriver/opera';
import { Info } from 'src/app/model/info';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private url: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }
  
  getUser(id: number){
    let url: string = this.url + "user/profile";
    let params = new HttpParams().append('id', id.toString());
    return this.http.get<any>(url,{ params: params });
  }

  saveUser(id: number, info: Info) {
    let url: string = this.url + "user/save";
    let params = new HttpParams().append('id', id.toString());
    return this.http.post<any>(url,info,{ params: params });
  }

  editUser(id: number, info: Info , name: string , type: string) {
    let url: string = this.url + "user/edit";
    let params = new HttpParams().append('id', id.toString())
    .append('name', name)
    .append('type', type);
    return this.http.put<any>(url,info,{ params: params });
  }

}



