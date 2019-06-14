import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService{
    
    private isLogggedIn: boolean;
    private url: string = "http://localhost:8080/";
    
    constructor(private http: HttpClient){}
    
    login(email:string, pass:string): Observable<any>{
        let url: string = this.url +"/login/log";
        let params = new HttpParams().append('mail', email)
        .append('pass', pass);
        return this.http.post<any>(url,null,{ params: params });
    }

    signup(email: any, pass: any) {
        let url: string = this.url + "user/signup";
        let params = new HttpParams().append('email', email)
        .append('pass', pass);
        return this.http.post<any>(url,null,{ params: params });
    }
}