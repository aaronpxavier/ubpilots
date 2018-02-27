import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BaseService } from './base-service.service';

@Injectable()
export class LoginService extends BaseService {
  private token: string;


  constructor(http: HttpClient) {
      super(http);
      super.setUrl('/');
  }


login(username: string, password: string) {

  }



}
