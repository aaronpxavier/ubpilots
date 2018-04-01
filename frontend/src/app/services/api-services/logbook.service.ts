import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BaseService} from './base-service.service';
import { Token } from './base-service.service';
import { LoginService } from "./login.service";

export class Pilot {
  constructor(public firstName:string, public lastName:string) {}
}
export class AC {
  constructor(public abreviation: string,
              public isTurbine: boolean,
              public numberOfEngines: number) {}
}
export class LogEntry  {
  constructor(
      public pic:Pilot,
      public sic:Pilot,
      public ac: AC,
      public date:Date,
      public _id:string,
      public isConfirmed:boolean,
      public departure:string,
      public destination:string,
      public imc: number,
      public night: number,
      public total: number,
      public takeoffs: number,
      public landings: number,
  ) {}
}
@Injectable()
export class LogbookService extends BaseService {

  constructor(http: HttpClient, loginService: LoginService) {
      super(http);
  }

  getLogs(): Promise<LogEntry[]> {
    this.setUrl('/api/log');
    return new Promise<LogEntry[]>((resolve, reject) => {
        this.get().subscribe((logs) => {
            resolve (logs);
        }, (err) => {
            reject(err);
        });
    });
  }
}
