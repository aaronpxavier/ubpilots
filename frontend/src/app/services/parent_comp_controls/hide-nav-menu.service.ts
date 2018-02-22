import { Injectable } from '@angular/core';

@Injectable()
export class HideNavMenuService {
  private hideMenu: boolean;
  constructor() {
    this.hideMenu = false;
  }
  getMenuStateEvent() {
  
  }
}
