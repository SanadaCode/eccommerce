import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Info } from 'src/app/model/info';
import { UserDataService } from '../service/user-data-service.service';

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
    if(this.info != null){
      this.profileForm=new FormGroup({
        firstName :new FormControl(this.info.firstName,Validators.required),
        lastName :new FormControl(this.info.lastName,Validators.required),
        country :new FormControl(this.info.country,Validators.required),
        city :new FormControl(this.info.city,Validators.required),
        address:new FormControl(this.info.address,Validators.required),
        cap :new FormControl(this.info.cap,[Validators.required,Validators.maxLength(5)]),
        phone :new FormControl(this.info.phone,Validators.maxLength(10)),
      });
    }else {
      this.profileForm=new FormGroup({
        firstName :new FormControl('',Validators.required),
        lastName :new FormControl('',Validators.required),
        country :new FormControl('',Validators.required),
        city :new FormControl('',Validators.required),
        address:new FormControl('',Validators.required),
        cap :new FormControl('',Validators.required),
        phone :new FormControl('',Validators.required),
      });
    }

  }

  onSubmit(event: Event){
    event.preventDefault();
    if(this.user.info == null){
      this.auth.profileSave(this.profileForm.value)
    }else{
      this.auth.profileEdit(this.profileForm.value)
      console.log("profilo esistente");
    }

  }

}
