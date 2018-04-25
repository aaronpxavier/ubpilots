import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { LogbookComponent } from '../logbook/logbook.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editClick(): void {
    
  }

  ngOnInit() {
  }
}