import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/api-services/login.service';
import { Router } from "@angular/router";
import { EventEmitter} from "@angular/core";

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
  private loginEventEmitter: EventEmitter<number>;

  constructor(private loginService: LoginService, private router:Router) {
      this.loginEventEmitter = loginService.getSignInEmitter();
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
  }

  loginBtnClick() {
      console.log('login click');
      this.router.navigateByUrl('/login')
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

}
