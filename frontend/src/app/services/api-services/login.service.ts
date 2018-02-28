import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {BaseService} from './base-service.service';
import setup from '../../../setup';

export class Photo {
    constructor(public title: string, public categories: string[],
                public taken: string, public keywords: string[],
                public photo: PhotoSubset[]) {}

@Injectable()
export class LoginService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
        this.setUrl('/api/login/');
    } // constructor



} // Photo
    getToken(userName, password)Promise<Photo[]> {
        return new Promise<Photo[]>((resolve, reject) => {
            let photos: Photo[];
            this.setUrl(this._photoAPIURL + query); // setURL defined in super
            this.get().subscribe(response => {
                photos = response['photos']; // typescript maps json object to typescript array of class Photo
                resolve(photos);
            });
        });
    }

}
