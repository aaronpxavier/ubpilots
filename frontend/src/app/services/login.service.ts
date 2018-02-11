import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {
  private token: string;


  constructor(private http: HttpClient) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        this.token = currentUser.token;
      }
  }

  hasToken() {
    if (this.token) {
        return true;
    } else {
        return false;
    }
  }

  login(username: string, password: string) {

  }



}
