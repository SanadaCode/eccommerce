import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getTreeMissingMatchingNodeDefError } from '@angular/cdk/tree';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileData = null;
  name: string;
  flag: boolean = false;
  private base64: any;
  private imgSrc;
  private base64Image;

  constructor(private http: HttpClient, private sanitizer:DomSanitizer ) { }

  ngOnInit() {
  }

  fileProgress(e) {
    let file = e.target.files[0]
    // Read in the image file as a data URL.
    this.fileData = file;



  }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  async onSubmit() {
    // const formData = new FormData();
    // formData.append('file', this.fileData);
    // this.http.post('http://localhost:8080/upload/upload', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('SUCCESS !!');
    //   }
    const readUploadedImage = (inputFile) => {
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

    await readUploadedImage(this.fileData).then(
      data => {
        this.base64 = data;
      }
    )
    console.log(this.base64);
    this.http.post('http://localhost:8080/upload/test', this.base64)
      .subscribe(res => {
        console.log(res)
        alert('SUCCESS !!')
      })
  }
  getImage() {
    this.http.get("http://localhost:8080/upload/test2").subscribe(
      data => {
        this.imgSrc=data;
        console.log(data)

      },
      error =>{
        this.base64Image='data:image/png;base64,' +error.error.text;
        console.log(this.imgSrc)
      } 
        
    )
  }
}

