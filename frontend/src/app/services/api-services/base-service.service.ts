
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

    private baseUrl = setup().baseURL;
    private url: string;

    // Constructor -----------------------------------------------------------//

    constructor(private http: HttpClient) {
        this.url = this.baseUrl;
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
          this.url = this.baseUrl + url;
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
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAxOC0wMi0xM1QwMjo0NTowNC4yNzVaIiwiX2lkIjoiNWE4MjUxMzBhZDIwY2YyNzVhMWI1NGUwIiwidXNlcm5hbWUiOiJtYXZyaWNrIiwicGFzc3dvcmQiOiJkYW5nZXJ6b25lRjE0IiwiaXNBZG1pbiI6dHJ1ZSwiX192IjowLCJpYXQiOjE1MTkyMDA0NDUsImV4cCI6MTUxOTIxMTI0NX0.HVmrPzrpCz2iVwyv0MR_OAHIoiFqxv9AlLWCkQFBMQY'
            })
        };
        return this.http.post<Response>(this.url, data, options);
    }

    getBaseURL() {
        return this.baseUrl;
    }

}
