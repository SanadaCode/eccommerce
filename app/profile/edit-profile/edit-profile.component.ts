import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Info } from 'src/app/model/info';
import { UserDataService } from '../service/user-data-service.service';
import { SpaceValidator } from 'src/app/validator/space.validator';
import Sweet from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private profileForm: FormGroup;
  info: Info;
  fileData;
  fileName: string = "Scegli un'immmagine profilo";
  type:string =null;
  base64;
  flag=false;
  
  constructor(private user: UserDataService,
    private auth:AuthService) { 
    
   this.info =this.user.info;
  }
  
  
  ngOnInit() {
    if(localStorage.getItem("firstName") != null){
      this.flag=true;
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
          [Validators.max(9999999999), Validators.min(1)]),
          img: new FormControl('', [])

      });
    }else {
      this.flag=false;
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
        img: new FormControl('', [])
      });
    }
    
  }
  
  readUploadedImage = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  async fileProgress(e) {
    let file = e.target.files[0]
    // Read in the image file as a data URL.
    this.fileData = file;
    let index= file.name.indexOf(".");
    this.fileName= file.name.substring(-1,index);
    this.type=file.name.substring(index +1 ,file.name.length)
    await this.readUploadedImage(this.fileData).then(
      data => {

        this.base64 = data;
        var i = new Image();
        i.onload = () =>{
          if(i != undefined && (i.width < 286 || i.height <190)){
            this.profileForm.controls["img"].setValue('');
            this.fileName='Scegli immagine';
            this.base64=null;
            this.message("Inserisci un immagine di almeno 286x190")
          }
        }
        
        i.src=this.base64;
      });
  }

  async onSubmit(event: Event){
    event.preventDefault();
    this.info = this.profileForm.value;
    if(this.profileForm.controls["img"].value != null 
    && this.profileForm.controls["img"].value != undefined 
    && this.profileForm.controls["img"].value !=""){
      await this.readUploadedImage(this.fileData).then(
        data => {
          this.base64 = data;
        });
      this.info.image=this.base64;
    }
    if(localStorage.getItem("firstName") == null){
      this.auth.profileSave(this.profileForm.value)
    }else{
      this.auth.profileEdit(this.profileForm.value, this.fileName , this.type)
    }
  }

  message(message:string){
    Sweet.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      showConfirmButton: false,
      timer: 2000
    })
  }

  reset(){
    event.preventDefault();
    if(localStorage.getItem("firstName") != null){
        this.flag=true;
        this.profileForm.controls["firstName"].setValue(this.info.firstName)
        this.profileForm.controls["lastName"].setValue(this.info.lastName)
        this.profileForm.controls["country"].setValue(this.info.country)
        this.profileForm.controls["city"].setValue(this.info.city)
        this.profileForm.controls["address"].setValue(this.info.address)
        this.profileForm.controls["cap"].setValue(this.info.cap)
        this.profileForm.controls["phone"].setValue(this.info.phone)
        this.profileForm.controls["img"].setValue('')
        this.fileName = "Scegli un'immmagine";
        this.profileForm.markAsPristine();
        this.profileForm.markAsUntouched();
    }else {
      this.flag=false;
      this.profileForm.controls["firstName"].setValue('')
        this.profileForm.controls["lastName"].setValue('')
        this.profileForm.controls["country"].setValue('')
        this.profileForm.controls["city"].setValue('')
        this.profileForm.controls["address"].setValue('')
        this.profileForm.controls["cap"].setValue('')
        this.profileForm.controls["phone"].setValue('')
        this.profileForm.controls["img"].setValue('')
        this.fileName = "Scegli un'immmagine";
        this.profileForm.markAsPristine();
        this.profileForm.markAsUntouched();
    }
  }

}
