import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductRestService } from '../service/product-rest.service';
import { ProductsDataService } from '../service/products-data.service';
import { SpaceValidator } from 'src/app/validator/space.validator';
import Sweet from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required, SpaceValidator, Validators.maxLength(100)]),
    desc: new FormControl('', [Validators.required, SpaceValidator, Validators.maxLength(500)]),
    quantity: new FormControl('', Validators.min(0)),
    productPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    img: new FormControl('', [Validators.required])
  });
  product: Product =null;
  products: Product[];
  name: string;
  flag: boolean;
  fileData;
  fileName: string = "Scegli un'immmagine";
  type:string;
  tempBase64;
  base64;
  titolo="Aggiungi prodotto";
  messageError=" Inserisci un immagine minimo di 320x254";
  constructor(private productData: ProductsDataService,
    private productService: ProductRestService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe( async (params) => {
      if (params['name']) {
        this.titolo="Edita prodotto";
        try{
          this.product= await this.productService.findProductByName(params['name']);
          this.productForm.controls["productName"].setValue(this.product.productName)
          this.productForm.controls["desc"].setValue(this.product.desc)
          this.productForm.controls["quantity"].setValue(this.product.quantity)
          this.productForm.controls["productPrice"].setValue(this.product.productPrice)
          this.productForm.controls["img"].clearValidators();
          this.base64='data:image/jpg;base64,' + this.product.img;
        }catch(error){
          console.log(error)
        }
        this.name=params["name"];
        this.flag=true;
      }else{
        this.titolo="Aggiungi prodotto";
        this.product = new Product();
        this.flag=false;
      }
    }
  )
  }

  async fileProgress(e) {
    let file = e.target.files[0]
    // Read in the image file as a data URL.
    this.fileData = file;
    this.fileData.witdh;
    let index= file.name.indexOf(".");
    this.fileName= file.name.substring(-1,index);
    this.type=file.name.substring(index +1 ,file.name.length)
    await this.readUploadedImage(this.fileData).then(
      data => {
        var i = new Image();
        i.onload = () =>{
          if(i != undefined && (i.width < 254 || i.height <320)){
            if(!this.flag){
              this.productForm.controls["img"].setValue('');
              this.fileName='Scegli immagine';
              this.base64=null;
            }
            this.message(this.messageError);
          }else{
            this.base64=data;
          }
        }
        this.tempBase64 = data;
        i.src=this.tempBase64 ;
       
      });
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

  async onSubmit() {
    event.preventDefault()
    let product = new Product();
    product = this.productForm.value;
    if(this.productForm.controls["img"].value != null 
    && this.productForm.controls["img"].value != undefined 
    && this.productForm.controls["img"].value !=""){
      await this.readUploadedImage(this.fileData).then(
        data => {
          this.base64 = data;
        });
      product.img=this.base64;
    }
    if (this.flag) {
      this.productData.editProduct(product, this.name, this.fileName , this.type);
    } else {
      this.productData.addProduct(product, this.fileName , this.type);
    }
  }

  message(message:string){
    Sweet.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

 async reset(){
  event.preventDefault()
    if (this.name) {
      this.titolo="Edita prodotto";
        this.product= await this.productService.findProductByName(this.name);
        this.productForm.controls["productName"].setValue(this.product.productName)
        this.productForm.controls["desc"].setValue(this.product.desc)
        this.productForm.controls["quantity"].setValue(this.product.quantity)
        this.productForm.controls["productPrice"].setValue(this.product.productPrice)
        this.productForm.controls["img"].setValue(null)
        this.base64='data:image/jpg;base64,' + this.product.img;
        this.fileName = "Scegli un'immmagine";
    }else{
      this.fileName = "Scegli un'immmagine";
      this.productForm.controls["productName"].setValue('');
      this.productForm.controls["desc"].setValue('');
      this.productForm.controls["quantity"].setValue('');
      this.productForm.controls["productPrice"].setValue('');
      this.productForm.controls["img"].setValue(null);
      this.productForm.markAsUntouched();
      this.productForm.markAsPristine();

      this.base64=null;
    }
    
  }
  
}
