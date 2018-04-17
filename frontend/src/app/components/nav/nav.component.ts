import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/api-services/login.service';
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";
import { HideNavMenuService } from "../../services/parent_comp_controls/hide-nav-menu.service";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { LoginNavService } from "../../services/navigation-services/login-nav.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  public showLoginButton: boolean;
  public showUserMenu: boolean;
  public userName: string;
  public isAdmin: boolean;
  public showMenu: boolean;
  private loginEventEmitter: EventEmitter<number>;
  private approvedLoginReturnURL: Array<string>;
  constructor(private loginService: LoginService,
              private router: Router,
              private hideMenuService: HideNavMenuService,
              private footerService: HideFooterService,
              private loginNavService: LoginNavService) {
      this.loginEventEmitter = loginService.getSignInEmitter();
      this.showMenu = true;
      this.approvedLoginReturnURL = ['/log'];
      this.showUserMenu = hideMenuService.getState();
      this.loginService.checkIfTokenIsValid()
          .then((isLoggedIn) => {
              if (isLoggedIn) {
                  this.setLoggedInState();
              } else {
                  this.setNotLoggedInState();
              }
          })
          .catch(() => {
              this.setNotLoggedInState();
          });
  }

  ngOnInit() {
      this.loginService.getSignInEmitter()
          .subscribe(item => {
              this.setLoggedInState();
          });
      this.loginService.getSignOutEmitter()
          .subscribe(item => {
              this.setNotLoggedInState();
          });
      this.hideMenuService.getEventEmitter()
          .subscribe(value => {
              if (value == 0) {
                  console.log('set False');
                  this.showMenu = false;
              } else if (value == 1) {
                  this.showMenu = true;
              }
          });
  }

  loginClick() {
      let currentURL = this.router.url;
      if(this.approvedLoginReturnURL.includes(currentURL))
          this.loginNavService.setPrev(currentURL);
      this.router.navigateByUrl('/login');
  }

  signOut() {
    this.setNotLoggedInState();
    this.loginService.signOut();
  }

  setLoggedInState() {
      this.showLoginButton = false;
      this.userName = localStorage.getItem(this.loginService.userKey);
      this.isAdmin = this.loginService.getTokenFromLocal().isAdmin;
      this.showUserMenu = true;
  }

  setNotLoggedInState() {
      this.showLoginButton = true;
      this.showUserMenu = false;
      this.isAdmin = false;
  }

  goHome() {
      this.router.navigateByUrl('/home');
      this.footerService.show();
  }

}
