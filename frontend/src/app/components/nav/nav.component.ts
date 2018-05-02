import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/api-services/login.service';
import { EventEmitter } from "@angular/core";
import { HideNavMenuService } from "../../services/parent_comp_controls/hide-nav-menu.service";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { LoginNavService } from "../../services/navigation-services/login-nav.service";
import { Title } from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location, PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
    showAlert = false;
    isLoggedIn = false;
  public showLoginButton: boolean;
  public showUserMenu: boolean;
  public userName: string;
  public isAdmin: boolean;
  public showMenu: boolean;
  public showForm = true;
  public showWaiting = false;
  public waitingMessage = 'waiting';
  public password: string;
  public errorMessage: string;
  private prevPage: string;
  private loginEventEmitter: EventEmitter<number>;
  private approvedLoginReturnURL: Array<string>;
  constructor(private loginService: LoginService,
              private router: Router,
              private hideMenuService: HideNavMenuService,
              private footerService: HideFooterService,
              private loginNavService: LoginNavService,
              private titleService: Title,
                public menuService: HideNavMenuService,
                private route: ActivatedRoute,
                private location: Location,
                private platformLocation: PlatformLocation,
            ) {
                this.titleService.setTitle("Login");
                // this.setWaitingState();
                // this.loginService.checkIfTokenIsValid()
                //     .then ((isValid) => {
                //         if (isValid) {
                //             console.log('isValid token in local');
        
                //             this.exitFromLogin();
                //         } else {
                //             this.setDefaultState();
                //         }
                //     })
                //     .catch((error) => {
                //         this.setDefaultState();
                //         this.footerService.hide();
                //         console.log(error);
                //     });
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

  // setLoggedInState() {
  //     this.showLoginButton = false;
  //     this.userName = localStorage.getItem(this.loginService.userKey);
  //     this.isAdmin = this.loginService.getTokenFromLocal().isAdmin;
  //     this.showUserMenu = true;
  // }

  setNotLoggedInState() {
      this.showLoginButton = true;
      this.userName = '';
      this.password = '';
      this.showUserMenu = false;
      this.isAdmin = false;
  }

  goHome() {
      this.router.navigateByUrl('/home');
      this.footerService.show();
  }

  exitFromLogin() {
    if(this.prevPage) {
        this.loginNavService.deletePrev();
        this.menuService.show();
        this.footerService.show();
        this.router.navigateByUrl(this.prevPage);
    }
    else {
        this.router.navigateByUrl('/');
    }
}

setDefaultState () {
    this.waitingMessage = '';
    this.showWaiting = false;
    this.showForm = true;
    this.errorMessage = '';
    this.menuService.hide();
    this.footerService.hide();
}

setWaitingState () {
    this.waitingMessage = 'loading...';
    this.showForm = false;
    this.showWaiting = true;
}

setLoggedInState () {
    this.showWaiting = false;
    this.showForm = false;
    this.waitingMessage = 'Your Logged In!!!';
    this.showLoginButton = false;
    this.userName = localStorage.getItem(this.loginService.userKey);
    this.isAdmin = this.loginService.getTokenFromLocal().isAdmin;
    this.showUserMenu = true;
}

setLogInFailedState() {
    this.showWaiting = false;
    this.waitingMessage = '';
    this.showForm = true;
    this.errorMessage = 'User Name or Password Not Valid';
}

setUser(event) {
    this.userName = event.target.value;
}

setPassword(event) {
    this.password = event.target.value;
}

submit() {
    if (this.userName == null || this.password == null) {
        this.setLogInFailedState();
        this.errorMessage = "User Name and Password fields must not be blank";
        return;
    }
    this.setWaitingState();
    this.loginService.getToken(this.userName, this.password)
        .then(() => {
            this.loginService.signInEventTrigger();
            this.exitFromLogin()
            this.isLoggedIn = true;
        })
        .catch((err) => {
            this.setLogInFailedState();
            this.showAlert = true;
            this.isLoggedIn = false;
        });
}

}
