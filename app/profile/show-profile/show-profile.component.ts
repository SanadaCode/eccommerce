import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/model/info';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDataService } from '../service/user-data-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  
  private flag = false;
  info: Info = null;

  constructor(private auth: AuthService,
    private user:UserDataService,
    private sanitizer:DomSanitizer) { 
      this.flag=false;
      this.user.infoUser.subscribe(
        data => {this.info=data;
        this.flag = true}
      );
      this.auth.profile();
    }

    transform(){
      return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' +this.info.image);
    }

  ngOnInit() {
    if(localStorage.getItem("firstName") == null){
      this.flag=true;
    }
  }
}