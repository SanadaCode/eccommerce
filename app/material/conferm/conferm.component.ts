import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-conferm',
  templateUrl: './conferm.component.html',
  styleUrls: ['./conferm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
