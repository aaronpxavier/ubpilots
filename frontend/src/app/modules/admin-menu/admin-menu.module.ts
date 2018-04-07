import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminMenuRouting} from './admin-menu.routing';
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";

@NgModule({
    imports: [
        CommonModule,
        AdminMenuRouting
    ],
    declarations: [
        AdminMenuComponent
    ]
})
export class AdminMenuModule {
}