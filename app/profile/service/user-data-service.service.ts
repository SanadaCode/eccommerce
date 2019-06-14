import { Injectable } from '@angular/core';
import { Info } from 'src/app/model/info';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  infoUser: Subject<Info>;
  info: Info = null;
  id: number;
  role: string;
  logedIn: boolean;

constructor() {
    this.infoUser=new Subject();
    this.info=new Info();
 }

 isSeller(): boolean{
  
   if(this.role === "vdt" && this.logedIn){
      return true;
   }
   return false;
  }

 isClient(): boolean{
  
   if(this.role === "clt" && this.logedIn){
      return true;
   }
   return false;
  }
  
  isLoggedIn(){
    if(this.logedIn){
       return true;
    }
    return false;
  }
}
