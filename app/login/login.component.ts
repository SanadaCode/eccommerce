import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { AuthService } from '../auth/auth.service';
import { NoSpaceValidator } from '../validator/nospace.validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private success:boolean=false;
  private loginForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'), NoSpaceValidator, Validators.maxLength(100)]),
    pass: new FormControl('',[Validators.required,NoSpaceValidator,Validators.maxLength(100), Validators.minLength(8)])
  })

  constructor( private auth: AuthService) {
    this.auth.getLoginErrors().subscribe( error =>
      this.success=error
    )
   }

  ngOnInit() {
   
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.signinUser(this.loginForm.value.email,this.loginForm.value.pass);
     
  }

}