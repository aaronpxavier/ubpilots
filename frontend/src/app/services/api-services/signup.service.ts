import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BaseService} from './base-service.service';
import { LoginService } from "./login.service";
import {Observable} from "rxjs/Observable";

export class SuccessMessage {
  constructor (public success: boolean, public userAlreadyExists) {}
}

@Injectable()
export class SignupService extends BaseService {
  constructor(http: HttpClient, loginService: LoginService) {
      super(http);
      this.setUrl('/api/login/signup');
  }
  signUpUsers(data): Observable<SuccessMessage> {
    return this.post(data);
  }
}
