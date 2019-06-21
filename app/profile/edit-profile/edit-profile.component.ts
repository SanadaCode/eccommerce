import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Info } from 'src/app/model/info';
import { UserDataService } from '../service/user-data-service.service';
import { SpaceValidator } from 'src/app/validator/space.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private profileForm: FormGroup;
  info: Info;

  
  constructor(private user: UserDataService,
    private auth:AuthService) { 
    
   this.info =this.user.info;
  }
  
  
  ngOnInit() {
    if(localStorage.getItem("firstName") != null){
      this.profileForm=new FormGroup({
        firstName :new FormControl(this.info.firstName,
          [Validators.required, SpaceValidator, Validators.maxLength(50)]
        ),
        lastName :new FormControl(this.info.lastName,
          [Validators.required, SpaceValidator, Validators.maxLength(50)]),
        country :new FormControl(this.info.country,
          [Validators.required, SpaceValidator, Validators.maxLength(57)]),
        city :new FormControl(this.info.city,
          [Validators.required, SpaceValidator, Validators.maxLength(90)]),
        address:new FormControl(this.info.address,
          [Validators.required, SpaceValidator, Validators.maxLength(100)]),
        cap :new FormControl(this.info.cap,
          [Validators.required,Validators.max(99999),Validators.min(1)]),
        phone :new FormControl(this.info.phone,
          [Validators.max(9999999999), Validators.min(1)])
      });
    }else {
      this.profileForm=new FormGroup({
        firstName :new FormControl('',
        [Validators.required, SpaceValidator, Validators.maxLength(50)]),
        lastName :new FormControl('',
        [Validators.required, SpaceValidator, Validators.maxLength(50)]),
        country :new FormControl('',
        [Validators.required, SpaceValidator, Validators.maxLength(57)]),
        city :new FormControl('',
        [Validators.required, SpaceValidator, Validators.maxLength(90)]),
        address:new FormControl('',
        [Validators.required, SpaceValidator, Validators.maxLength(100)]),
        cap :new FormControl('', 
        [Validators.required,Validators.max(99999),Validators.min(1)]),
        phone :new FormControl('', 
        [Validators.max(9999999999), Validators.min(1)]),
      });
    }
    
  }

  onSubmit(event: Event){
    event.preventDefault();
    if(localStorage.getItem("firstName") == null){
      this.auth.profileSave(this.profileForm.value)
    }else{
      this.auth.profileEdit(this.profileForm.value)
      console.log("profilo esistente");
    }

    
  }



}
