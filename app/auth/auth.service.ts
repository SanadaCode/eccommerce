import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { Observable, Subject } from 'rxjs';
import { UserRestService } from '../profile/service/user-rest.service';
import { UserDataService } from '../profile/service/user-data-service.service';
import { Info } from '../model/info';
import { ProductsDataService } from '../products/service/products-data.service';


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
    private userData: UserDataService) {}
    
  public getLoginErrors():Subject<boolean>{
      return this.succ;
  }
    
  signinUser(email:string, pass:string){
    this.reset();
    this.loginService.login(email,pass).subscribe(
    data => {
      this.userData.info=new Info();
      this.userData.info.firstName=data.name;
      this.userData.info.lastName=data.surname;
      this.userData.role=data.cod;
      this.userData.logedIn=true;
      console.log(data.cod)
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
    this.reset();
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
      data => {this.userData.info=data,
        this.router.navigateByUrl("profile/show")
      },
      error => console.log(error)
    )
  }

  profileSave(info: Info){
    this.userService.saveUser(this.id,info).subscribe(
      data => {this.userData.info=data,
        this.router.navigateByUrl("profile/show")
      },
      error => console.log(error)
    )
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

  }

  loadData(email: string, id: number, role : string){
    this.isLoggedIn = true;
    this.id = id
    this.role = role;
    this.email=email;
  }

  getId(){
    return this.id;
  }
}
    