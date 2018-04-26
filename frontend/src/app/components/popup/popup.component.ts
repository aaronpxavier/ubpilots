import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { LogbookComponent } from '../logbook/logbook.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  public pic: any;
  public sic: any;
  public ac: any;
  public id: string;
  public date: string;
  public departure: string;
  public destination: string;
  public imc: number;
  public night: number;
  public total: number;
  public takeoffs: number;
  public landings: number;


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