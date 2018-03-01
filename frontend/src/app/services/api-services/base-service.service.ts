
// written by Michael Conroy
// modified by Arun Mavumkal

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import setup from '../../../setup';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class BaseService {

    // Variables -------------------------------------------------------------//

    private BASE_URL = setup().baseURL;
    private url: string;
    public tokenKey;

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

    get(): Observable<Response> {
        return this.http.get<Response>(this.url);
    } // get

    // solution found on https://github.com/angular/angular/issues/13241

    getURLEncodedString(data: any): string {
        // `username=${userName}&pass=${password}`;
        console.log('encodingString');
        let count = 0;
        let outputString = '';
        for (const key in data) {
            if (count === 0) {
                outputString += key + '=';
            } else {
                outputString += '&' + key + '=';
            }
            outputString += data[key];
            ++count;
        }
        console.log(outputString);
        return outputString;
    }

    post(data: any): Observable<Response> {
        // const body = `username=${userName}&pass=${password}`;
        const body = this.getURLEncodedString(data);
        console.log(body);
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        console.log(this.url);
        return this.http.post<Response>(this.url, body, options);
    }

    postWithToken(data: any): Observable<Response> {
        const body = this.getURLEncodedString(data);
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem(this.tokenKey)
            })
        };
        return this.http.post<Response>(this.url, body, options);
    }

    getWithToken(): Observable<Response> {
         if (localStorage.getItem(this.tokenKey) === null) {
             throw new Error ('token Is null');
         }

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem(this.tokenKey)
            })
        };
        return this.http.get<Response>(this.url, options);
    }

    getBaseURL() {
        return this.BASE_URL;
    }

}
