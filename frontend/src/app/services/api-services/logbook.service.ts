import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BaseService} from './base-service.service';
import { Token } from './base-service.service';
import { LoginService } from "./login.service";
import { Success } from "./base-service.service";

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
      public username: string = '',
      public ac: AC,
      public date: Date,
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

  constructor(http: HttpClient, private loginService: LoginService) {
      super(http);
  }

  getLogs(): Promise<LogEntry[]> {
        this.setUrl('/api/log');
        return new Promise<LogEntry[]>((resolve, reject) => {
            this.get().subscribe((logs) => {
                resolve (logs);
            }, (err) => {
                this.loginService.checkIfTokenIsValid()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            reject(err);
                        } else {
                            this.loginService.signOut();
                            reject(err);
                        }
                    });
            });
        });
    }
    getUnconfirmedLogs(): Promise<LogEntry[]> {
        this.setUrl('/api/log/unconfirmed');
        return new Promise<LogEntry[]>((resolve, reject) => {
            this.get().subscribe((logs) => {
                resolve (logs);
            }, (err) => {
                reject(err);
            });
        });
    }

  postLogs(logsJSON): Promise<Success> {
      console.log('inside log service');
      this.setUrl('/api/log');
      return new Promise<Success>((resolve, reject) => {
          this.postWithToken(logsJSON).subscribe(data => {
              resolve(data);
          }, err => {
              this.loginService.checkIfTokenIsValid()
                  .then(isLoggedIn => {
                      if (isLoggedIn) {
                          reject(err);
                      } else {
                          this.loginService.signOut();
                          reject(err);
                      }
                  });
          });
      });
  }

    deleteLog(id: string): Promise<Success> {
        console.log('inside log service');
        this.setUrl('/api/log');
        return new Promise<Success>((resolve, reject) => {
            this.deleteWithToken(id).subscribe(data => {
                resolve(data);
            }, err => {
                this.loginService.checkIfTokenIsValid()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            reject(err);
                        } else {
                            this.loginService.signOut();
                            reject(err);
                        }
                    });
            });
        });
    }
    confirmLog(id: string): Promise<Success> {
        this.setUrl('/api/log/confirm');
        const DATA = {
            id: id
        };
        console.log('inside log service');
        return new Promise<Success>((resolve, reject) => {
            this.putWithToken(DATA).subscribe(data => {
                resolve(data);
            }, err => {
                this.loginService.checkIfTokenIsValid()
                    .then(isLoggedIn => {
                        if (isLoggedIn) {
                            reject(err);
                        } else {
                            this.loginService.signOut();
                            reject(err);
                        }
                    });
            });
        });
    }
    
    updateLog(id: string, logData: LogEntry): Promise<Success> {
      let date = new Date(logData.date);
      console.log(logData);
      this.setUrl('/api/log/update/' + id);
      const DATA = {
        picFirst: logData.pic.firstName,
        picLast: logData.pic.lastName,
        sicFirst: logData.sic.firstName,
        sicLast: logData.sic.lastName,
        acAbrev: logData.ac.abreviation,
        isJet: logData.ac.isTurbine,
        noEngines: logData.ac.numberOfEngines,
        dep: logData.departure,
        dest: logData.destination,
        imc: logData.imc,
        to: logData.takeoffs,
        lands: logData.landings,
        night: logData.night,
        username: logData.username,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        total: logData.total
      };


      return new Promise<Success>((resolve, reject) => {
          this.putWithToken(DATA).subscribe(data => {
              resolve(data);
          }, err => {
              this.loginService.checkIfTokenIsValid()
                  .then(isLoggedIn => {
                      if (isLoggedIn) {
                          reject(err);
                      } else {
                          this.loginService.signOut();
                          reject(err);
                      }
                  });
          });
      });
    }

}
