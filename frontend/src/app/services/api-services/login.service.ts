import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BaseService} from './base-service.service';
import { Token } from './base-service.service';

@Injectable()
export class LoginService extends BaseService {

    // Variables -------------------------------------------------------------//

    // Constructor -----------------------------------------------------------//

    constructor(http: HttpClient) {
        super(http);
    } // constructor

    checkIfTokenIsValid(): Promise<boolean> {
        this.setUrl('/api/login/authcheck');

        return new Promise< boolean >((resolve, reject) => {
                if (localStorage.getItem(this.tokenKey) == null) {
                    resolve(false);
                }
                this.getWithToken().subscribe((res) => {
                    console.log(res);
                if (res.success) {
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
            this.post({username: userName, pass: password}).subscribe((token) => {
                const tokenJSON = {
                    success: token.success,
                    isAdmin: token.isAdmin,
                    token: token.token
                }
                localStorage.setItem(this.tokenKey, JSON.stringify(tokenJSON));
                localStorage.setItem(this.userKey, userName);
                resolve(token);
            }, (err) => {
                reject(err);
            });
        });
    }

    signOut() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    getTokenFromLocal (): Token {
        let token: Token;
        const TEMP_TOKEN = localStorage.getItem(this.tokenKey);
        token = null;
        if (TEMP_TOKEN) {
            token = JSON.parse(TEMP_TOKEN);
        }
        return token;
    }

}
