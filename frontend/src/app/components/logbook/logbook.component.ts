import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from "../../services/api-services/login.service";
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { LogEntry } from "../../services/api-services/logbook.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { PlatformLocation } from '@angular/common'
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { EventEmitter } from "@angular/core";
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit, AfterViewInit {
  
  public isAdmin = false;
  public isSignedIn = false;
  public  columnsDef = ['select', 'date', 'pic', 'sic' , 'ac', 'dep', 'dest', 'imc', 'night', 'total'];
  private dataSource:MatTableDataSource<LogEntry>;
  private logsDataRetrievedEvent = new EventEmitter<number> ();
  selection = new SelectionModel<Element>(true, []);

  
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
      // get our data every subsequent 10 seconds
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sortForDataSource: MatSort;
  @ViewChild('filter') filter: ElementRef;
  ngAfterViewInit() {
    
      this.logService.getLogs()
          .then( data => {
              this.dataSource = new MatTableDataSource<LogEntry>(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource!.sort = this.sortForDataSource;
          })
          .catch(err => {
              console.error(err);
          })

         
  }

  

    newBtnClick() {
      this.router.navigateByUrl('/log/form');
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
  }
