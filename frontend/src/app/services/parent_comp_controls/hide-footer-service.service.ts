import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable()
export class HideFooterService {
    private footerVisable: boolean;
    private eventEmitter = new EventEmitter<number>();

    constructor() {
        this.footerVisable = true;
    }
    getState() {
        return this.footerVisable;
    }

    getEventEmitter(): EventEmitter<number> {
        return this.eventEmitter;
    }
    hide() {
        this.footerVisable = false;
        this.eventEmitter.emit(0);
    }
    show () {
        this.footerVisable = true;
        this.eventEmitter.emit(1);
    }
}
