import { Injectable } from '@angular/core';

@Injectable()
export class HideNavMenuService {
  private menuVisable: boolean;
  constructor() {
    this.menuVisable = true;
  }
  getMenuState() {
    return this.menuVisable;
  }
  hideMenu() {
    this.menuVisable = false;
  }
  showMenu() {
    this.menuVisable = true;
  }
}
