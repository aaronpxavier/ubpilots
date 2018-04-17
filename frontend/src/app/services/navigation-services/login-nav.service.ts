import { Injectable } from '@angular/core';

@Injectable()
export class LoginNavService {

  private prevURL: string;
  constructor() {
    this.prevURL = null;
  }

  setPrev(url: string) {
    this.prevURL = url;
  }

  getPrev(): string {
    return this.prevURL;
  }
  deletePrev() {
    this.prevURL = null;
  }
}
