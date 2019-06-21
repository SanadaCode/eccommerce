import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  fileData = null;
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
  }
 
  fileProgress(e) {
    console.log(e)
    this.fileData = <File>e.target.files[0];
  }
 
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('http://localhost:8080/upload/upload', formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      })
  }

}
