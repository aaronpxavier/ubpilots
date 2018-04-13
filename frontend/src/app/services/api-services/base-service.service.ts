
// Class is based on a service written by Michael Conroy
// It has been modified by Arun Mavumkal

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


export class Token {
    constructor (public success, public isAdmin, public token) {}
}

export class Success {
    constructor (public success) {}
}
@Injectable()
export class BaseService {

    // Variables -------------------------------------------------------------//

    private BASE_URL = environment.baseURL;
    private url: string;
    public tokenKey = 'token';
    public userKey = 'user';
    // Constructor -----------------------------------------------------------//

    constructor(private http: HttpClient) {
        this.url = this.BASE_URL;
        console.log('BASE_URL' + this.BASE_URL);
    } // constructor

    // Methods ---------------------------------------------------------------//

    /**
     * Set Base Url
     * @description: Set the base API URL
     * @param url
     * @return boolean
     */
    setUrl(url: string): Boolean {
        if (url !== undefined) {
          this.url = this.BASE_URL + url;
          return true;
        }
        return false;
    } // setUrl

    get(): Observable<any> {
        console.log('get called');
        return this.http.get<any>(this.url);
    } // get

    // solution found on https://github.com/angular/angular/issues/13241

    getURLEncodedString(data: any): string {
        let count = 0;
        let outputString = '';
        for (const key in data) {
            if (count === 0) {
                outputString += encodeURIComponent(key) + '=';
            } else {
                outputString += '&' + key + '=';
            }
            outputString += encodeURIComponent(data[key]);
            ++count;
        }
        return outputString;
    }

    post(data: any): Observable<any> {
        // const body = `username=${userName}&pass=${password}`;
        const body = this.getURLEncodedString(data);
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post<any>(this.url, body, options);
    }

    postWithToken(data: any): Observable<any> {
        console.log('inside post with token');
        const body = this.getURLEncodedString(data);

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': JSON.parse(localStorage.getItem(this.tokenKey)).token
            })
        };
        return this.http.post<any>(this.url, body, options);
    }

    // deleteWithToken(id: string): Observable<any> {
    //     console.log('inside post with token');
    //
    //     const params = new HttpParams()
    //         .set('id', id);
    //
    //     const options = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': JSON.parse(localStorage.getItem(this.tokenKey)).token
    //         })
    //     };
    //     return this.http.delete(this.url,{params, options})//<any>(this.url, body, options);
    // }

    getWithToken(): Observable<Success> {
         if (localStorage.getItem(this.tokenKey) === null) {
             throw new Error ('token Is null');
         }

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': JSON.parse(localStorage.getItem(this.tokenKey)).token
            })
        };
        return this.http.get<Success>(this.url, options);
    }

    getBaseURL() {
        return this.BASE_URL;
    }

}
