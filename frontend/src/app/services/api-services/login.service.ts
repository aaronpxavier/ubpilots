import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import setup from '../../../setup';
import { URLSearchParams } from '@angular/http';
import {BaseService} from './base-service.service';

export class Token {
    constructor(public success: boolean, public token: string) {}
}

@Injectable()
export class LoginService extends BaseService {

    // Variables -------------------------------------------------------------//
    private isLoggedIn = false;
    private localStorageTokenKey = 'token';
    private previousRoute;
    // Constructor -----------------------------------------------------------//

    constructor(http: HttpClient) {
        super(http);
        if (localStorage.getItem(this.localStorageTokenKey) !== null) {
            console.log('local storage: ' + localStorage.getItem(this.localStorageTokenKey));
        }
    } // constructor

    checkIfTokenIsValid(): Promise<boolean> {
        this.setUrl('/api/login/authcheck')
        return new Promise< boolean >((resolve, reject) => {
                this.getWithToken().subscribe((res) => {
                    console.log(res);
                if (res['success']) {
                    resolve  (true);
                } else {
                    resolve (false);
                }
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
                localStorage.setItem(this.localStorageTokenKey, token.token);
                resolve(token);
            });
        });
    }

}
