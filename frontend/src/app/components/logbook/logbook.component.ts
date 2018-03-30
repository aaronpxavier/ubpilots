import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from "../../services/api-services/login.service";
import { EventEmitter} from "@angular/core";
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit {

  public isAdmin = false;
  public isSignedIn = false;
  private logoutEventEmitter: EventEmitter<number>;
  public isLinear = false;
  constructor(private titleService: Title, private loginService: LoginService,
              public dialog: MatDialog, private router:Router) {
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
      this.loginService.getSignOutEmiiter()
          .subscribe(item => {
            this.isSignedIn = false;
            this.isAdmin = false;

          });

  }

    newBtnClick() {
      this.isLinear = true;
    }




}




