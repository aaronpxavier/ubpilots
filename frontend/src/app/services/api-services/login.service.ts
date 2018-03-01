import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {BaseService} from './base-service.service';

export class Token {
    constructor(public success: boolean, public token: string) {}
}

@Injectable()
export class LoginService extends BaseService {

    // Variables -------------------------------------------------------------//

    // Constructor -----------------------------------------------------------//

    constructor(http: HttpClient) {
        super(http);
        if (localStorage.getItem(this.tokenKey) !== null) {
            console.log('local storage: ' + localStorage.getItem(this.tokenKey));
        }
    } // constructor

    checkIfTokenIsValid(): Promise<boolean> {
        this.setUrl('/api/login/authcheck');
        return new Promise< boolean >((resolve, reject) => {
                this.getWithToken().subscribe((res) => {
                    console.log(res);
                if (res['success']) {
                    resolve  (true);
                } else {
                    resolve (false);
                }
            }, (err) => {
                        reject(err);
                    });
        });
    }

    // Methods ---------------------------------------------------------------//

    getToken(userName, password): Promise<Token> {
        this.setUrl('/api/login/auth');
        return new Promise<Token>((resolve, reject) => {
            console.log(userName + ' ' + password);
            this.post({username: userName, pass: password}).subscribe((res) => {
                const token: Token = res;
                localStorage.setItem(this.tokenKey, token.token);
                resolve(token);
            }, (err) => {
                reject(err);
            });
        });
    }

    signOut() {
        localStorage.removeItem(this.tokenKey);
    }

}
