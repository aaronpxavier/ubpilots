import { Injectable } from '@angular/core';

@Injectable()
export class HideFooterService {
    private footerVisable: boolean;

    constructor() {
        this.footerVisable = true;
    }
    getState() {
        return this.footerVisable;
    }
    hide() {
        this.footerVisable = false;
    }
    show () {
        this.footerVisable = true;
    }
}
