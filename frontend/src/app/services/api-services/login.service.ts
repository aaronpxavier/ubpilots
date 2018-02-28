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

    // Constructor -----------------------------------------------------------//

    constructor(http: HttpClient) {
        super(http);
    } // constructor

    checkIfTokenIsValid() {
        console.log('checkIfTokenIsValid');
    }

    // Methods ---------------------------------------------------------------//

    // Photo
    getToken(userName, password): Promise<Token> {
        this.setUrl('/api/login/auth');
        return new Promise<Token>((resolve, reject) => {
            console.log(userName + ' ' + password);
            this.post({username: userName, pass: password}).subscribe((res) => {
                let token: Token = res;
                localStorage.setItem('token', token.token);
                resolve(token);
            });
        });
    }
}
