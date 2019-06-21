import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NoSpaceValidator } from '../validator/nospace.validator';
import { ConfirmPassValidator } from '../validator/doublePass.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private success:boolean=false;

  private loginForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), NoSpaceValidator, Validators.maxLength(100)]),
    pass: new FormControl('',[Validators.required,NoSpaceValidator,Validators.maxLength(100), Validators.minLength(8)]),
    confirmPass: new FormControl('',[Validators.required,NoSpaceValidator,Validators.maxLength(100), Validators.minLength(8)])
  },{validators:ConfirmPassValidator})
 
  constructor(private auth: AuthService) { 
    this.auth.getLoginErrors().subscribe( error =>
      this.success=error
    )
  }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.signup(this.loginForm.value.email,this.loginForm.value.pass);
  }

}
