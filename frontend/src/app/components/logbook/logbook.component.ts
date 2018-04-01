import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from "../../services/api-services/login.service";
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { LogEntry } from "../../services/api-services/logbook.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit, AfterViewInit {

  public isAdmin = false;
  public isSignedIn = false;
  public isLinear = false;
  public logs: LogEntry[];

  constructor(private titleService: Title,
              private loginService: LoginService,
              public dialog: MatDialog,
              private router:Router,
              private logService: LogbookService)
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

}




