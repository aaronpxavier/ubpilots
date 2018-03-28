import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BaseService} from './base-service.service';
import { Token } from './base-service.service';
import { LoginService } from "./login.service";

@Injectable()
export class LogbookService extends BaseService {

  constructor(http: HttpClient, loginService: LoginService) {
    super(http);
  }
}
