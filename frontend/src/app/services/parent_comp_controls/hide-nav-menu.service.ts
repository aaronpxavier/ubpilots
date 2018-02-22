import { Injectable } from '@angular/core';

@Injectable()
export class HideNavMenuService {
  private menuVisable: boolean;
  constructor() {
    this.menuVisable = true;
  }
  getState() {
    return this.menuVisable;
  }
  hide() {
    this.menuVisable = false;
  }
  show() {
    this.menuVisable = true;
  }
}
