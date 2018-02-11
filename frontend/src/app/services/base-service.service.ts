import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import setup from '../../setup';

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

    post(data: any): Observable<Response> {
        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.http.post<Response>(this.url, data, options);
    }

    // postWithToken(data: any): Observable<Response> {
    //     // TODO
    // }


}
