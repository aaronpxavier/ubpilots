import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable()
export class HideNavMenuService {
  private menuVisable: boolean;
  private eventEmitter: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    this.menuVisable = true;
  }

  getEventEmitter(): EventEmitter<number> {
    return this.eventEmitter;
  }

  getState() {
    return this.menuVisable;
  }
  hide() {
    this.eventEmitter.emit(0);
    this.menuVisable = false;
  }
  show() {
    this.eventEmitter.emit(1);
    this.menuVisable = true;
  }
}
