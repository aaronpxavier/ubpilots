import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from "../../services/api-services/login.service";
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { LogEntry } from "../../services/api-services/logbook.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { PlatformLocation } from '@angular/common'

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit, AfterViewInit {

  public isAdmin = false;
  public isSignedIn = false;
  public  columnsDef = ['date', 'pic', 'sic' , 'ac', 'dep', 'dest', 'imc', 'night', 'total'];
  public logs: LogEntry[];



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
      this.logService.getLogs()
          .then( data => {
              this.logs = data;

              console.log(this.logs);
          })
          .catch(err => {
              console.error(err);
          })
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

  ngAfterViewInit() {
  }

    newBtnClick() {
      this.router.navigateByUrl('/log/form');
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
}

