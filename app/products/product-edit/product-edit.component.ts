import { Component, OnInit, Input } from '@angular/core';
import { ProductsDataService } from '../service/products-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { TouchSequence } from 'selenium-webdriver';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductRestService } from '../service/product-rest.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.min(0)),
    productPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    img: new FormControl('', Validators.required)
  });;
  product: Product =null;
  products: Product[];
  name: string;
  flag: boolean;

  constructor(private productData: ProductsDataService,
    private productService: ProductRestService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe( async (params) => {
      if (params['name']) {
        try{
          this.product= await this.productService.findProductByName(params['name']);
          this.productForm.controls["productName"].setValue(this.product.productName)
          this.productForm.controls["desc"].setValue(this.product.desc)
          this.productForm.controls["quantity"].setValue(this.product.quantity)
          this.productForm.controls["productPrice"].setValue(this.product.productPrice)
          this.productForm.controls["img"].setValue(this.product.img)
        }catch(error){
          console.log(error)
        }
        this.name=params["name"];
        this.flag=true;
      }else{
        this.product = new Product();
        this.flag=false;
      }
    }
  )
  }

  onSubmit() {
    event.preventDefault()
    if (this.flag) {
      this.productData.editProduct(this.productForm.value, this.productForm.controls["productName"].value);
    } else {
      this.productData.addProduct(this.productForm.value);
    }
  }

}
