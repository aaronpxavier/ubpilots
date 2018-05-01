import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from "../../services/api-services/login.service";
import { Router } from "@angular/router";
import { LogEntry } from "../../services/api-services/logbook.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { PlatformLocation } from '@angular/common'
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material';
import { EventEmitter } from "@angular/core";
import {SelectionModel} from '@angular/cdk/collections';
import {DialogBoxComponent} from '../dialogBox/dialogBox.component';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit, AfterViewInit {

  public isAdmin = false;
  public isSignedIn = false;
  public  columnsDef = ['select', 'date', 'pic', 'sic' , 'ac', 'dep', 'dest', 'imc', 'night', 'total'];
  public dataSource:MatTableDataSource<LogEntry>;
  private logsDataRetrievedEvent = new EventEmitter<number> ();
  private selection = new SelectionModel<Element>(true, []);

  
  constructor(private titleService: Title,
              private loginService: LoginService,
              public dialog: MatDialog,
              private router:Router,
              private logService: LogbookService,
              private footerService: HideFooterService,
              private platFormLocation: PlatformLocation)
  {
    this.titleService.setTitle("UBPA Logbook");
    const TOKEN = loginService.getTokenFromLocal();
    if (TOKEN == null) {
      this.isSignedIn = false;
    } else {
      if (TOKEN.isAdmin) {
        this.isAdmin = true;
      }
      this.isSignedIn = true;
    }
  }

  openDialog(rowIn): void {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px'
    });
    dialogRef.componentInstance.pic = rowIn.pic;
    dialogRef.componentInstance.sic = rowIn.sic;
    dialogRef.componentInstance.ac = rowIn.ac.abreviation;
    dialogRef.componentInstance.id = rowIn._id;
    dialogRef.componentInstance.date = rowIn.date;
    dialogRef.componentInstance.departure = rowIn.departure;
    dialogRef.componentInstance.destination = rowIn.destination;
    dialogRef.componentInstance.imc = rowIn.imc;
    dialogRef.componentInstance.night = rowIn.night;
    dialogRef.componentInstance.total = rowIn.total;
    dialogRef.componentInstance.takeoffs = rowIn.takeoffs;
    dialogRef.componentInstance.landings = rowIn.landings;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
      this.footerService.hide();
      this.platFormLocation.onPopState(() => {
          this.footerService.show();
      });
      this.loginService.getSignOutEmitter()
          .subscribe(item => {
            this.isSignedIn = false;
            this.isAdmin = false;
          });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sortForDataSource: MatSort;
  @ViewChild('filter') filter: ElementRef;
  ngAfterViewInit() {
    
      this.logService.getLogs()
          .then( data => {
             this.setDataSource(data);
          })
          .catch(err => {
              console.error(err);
          });
  }

  setDataSource(data) {
      this.dataSource = new MatTableDataSource<LogEntry>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource!.sort = this.sortForDataSource;
  }

    homeBtnClick() {
      this.router.navigateByUrl('/home');
      this.footerService.show();
    }

    formatDate(dateIn: string): string {
      let months = [ "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"];
      let formatedDate: string;
      var date = new Date (dateIn);
      formatedDate = months[date.getMonth()] + ' ';
      formatedDate += date.getDate() + ', ';
      formatedDate += date.getFullYear();
      return formatedDate;
    }

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select());
    }

    removeSelectedRows() {
        let i = 0;
        this.dataSource.data.forEach(row => {
            let rowToDelete = JSON.stringify(this.selection.selected[i]);
            let rowJSON = JSON.parse(rowToDelete);
            
            let id = rowJSON._id;
            this.logService.deleteLog(id)
                .then(() => {
                    this.dataSource = null;
                    return this.logService.getLogs();
                })
                .then(data => {
                    this.setDataSource(data);
                })
                .catch(err => {console.log(err)});
            ++i;
        });
        this.selection = new SelectionModel<Element>(true, []);
    }
    
    clean(stringIn: string): string {
      
      if (stringIn === "undefined")
      {
        console.log('if block: ' + stringIn)
        return ' '
      }
      else{
        console.log('else block: ' + stringIn)
        return stringIn;
      }
    }
  }
  
  
