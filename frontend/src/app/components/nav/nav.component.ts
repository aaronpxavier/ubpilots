import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/api-services/login.service';

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
  constructor(private loginService: LoginService) {
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
