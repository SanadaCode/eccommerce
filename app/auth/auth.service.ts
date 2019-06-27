import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../login/service/login.service';
import { Info } from '../model/info';
import { UserDataService } from '../profile/service/user-data-service.service';
import { UserRestService } from '../profile/service/user-rest.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private isLoggedIn: boolean =false;
  private id: number;
  private email: string;
  private role: string;
  private succ= new Subject<boolean>() ;
  
  ngOnInit(): void {
  }
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserRestService,
    private userData: UserDataService) {
      let logedIn =localStorage.getItem("isLoggedIn")
      if(logedIn != null){
        this.isLoggedIn=true;
        let id = localStorage.getItem("id");
        let name = localStorage.getItem("firstName");
        let surname = localStorage.getItem("lastName");
        let role = localStorage.getItem("role");
        this.role = role;
        this.id=parseInt(id);
        this.userData.info.firstName=name;
        this.userData.role=role;
        this.userData.logedIn=true;
        this.userData.info.lastName=surname;
        this.userData.id=parseInt(id);
        this.succ.next(false);
      }
    }
    
  public getLoginErrors():Subject<boolean>{
      return this.succ;
  }
    
  signinUser(email:string, pass:string){
    this.saveProductToAdd();
    this.loginService.login(email,pass).subscribe(
    data => {
      this.saveProductToAdd();
      this.userData.info=new Info();
      this.userData.info.firstName=data.name;
      this.userData.info.lastName=data.surname;
      if(data.surname != null){
        localStorage.setItem("firstName", data.name);
        localStorage.setItem("lastName", data.surname);
      }
      this.userData.role=data.cod;
      this.userData.logedIn=true;
      this.loadData(email,data.id, data.cod);
      this.userData.id=data.id;
      this.succ.next(false);
      this.router.navigateByUrl('/');
    },
    error => this.succ.next(true)
    );
  }
    
  isAuthenticated() {
    return this.isLoggedIn;
  }
  
  logout(){
    this.reset();
    this.router.navigateByUrl('/');
  }

  signup(email:string, pass:string){
    this.saveProductToAdd();
    this.loginService.signup(email,pass).subscribe(
      data => {
        this.loadData(email,data.id, data.cod);
        this.succ.next(false);
        this.router.navigateByUrl('/');
      },
      error => this.succ.next(true)
      );
  }
  
  profile(){
    this.userService.getUser(this.id).subscribe(
      data=> {
        this.userData.infoUser.next(data),
        this.userData.info=data
      }   
    )
  }

  profileEdit(info: Info){
    this.userService.editUser(this.id,info).subscribe(
      data => {this.userData.info=data;
        this.router.navigateByUrl("profile/show")
        }
    )
  }

  profileSave(info: Info){
    this.userService.saveUser(this.id,info).subscribe(
      data => {this.userData.info=data,
        localStorage.setItem("firstName", this.userData.info.firstName);
        localStorage.setItem("lastName", this.userData.info.firstName);
        if(localStorage.getItem("add") !=null){
          this.router.navigateByUrl("cart");
        }else{
          this.router.navigateByUrl("profile/show");
        }
      },
      error => localStorage.removeItem("add"))
  }

  saveProductToAdd(){
    if(localStorage.getItem("addToCart") != null){
      let name= localStorage.getItem("name");
      let quantity = localStorage.getItem("quantity");
      this.reset();
      localStorage.setItem("addToCart","true");
        localStorage.setItem("name",name);
        localStorage.setItem("quantity",quantity);
    }else{
      this.reset();
    }
  }
  reset(){
    this.isLoggedIn= false;
    this.id = null;
    this.role = null;
    this.email= null;
    this.userData.id=null;
    this.userData.info=null;
    this.userData.logedIn=false;
    this.userData.role=null;
    localStorage.clear();
    
  }

  loadData(email: string, id: number, role : string){
    this.isLoggedIn = true;
    this.id = id
    this.role = role;
    this.email=email;
    localStorage.setItem("id" , id.toString());
    localStorage.setItem("isLoggedIn" , this.isLoggedIn.toString());
    localStorage.setItem("role" , role);
    localStorage.setItem("email" , email);
  }


  getId(){
    return this.id;
  }
}
    