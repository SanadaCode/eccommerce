import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ProductsDataService } from '../products/service/products-data.service';
import { UserDataService } from '../profile/service/user-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("nameInput",null) name : ElementRef;

  constructor(private productData: ProductsDataService,
    private render: Renderer2,
    private userData: UserDataService) { }

  ngOnInit() {
    this.productData.reloadProduct();
  }

  onSearch(){
    this.productData.searchProductByName(this.name.nativeElement.value);
    
  }

  onChange(){
    if(this.name.nativeElement.value != null && this.name.nativeElement.value != ''){
      this.render.removeClass(this.name.nativeElement, 'search_input')
      this.render.addClass(this.name.nativeElement, 'stop')
    }else{
      this.render.removeClass(this.name.nativeElement, 'stop')
      this.render.addClass(this.name.nativeElement, 'search_input')
    }
  }

  show(){
    if (this.userData.isLoggedIn()){
      return !this.userData.isSeller()
    }else{
      return true;
    }
  }
}
