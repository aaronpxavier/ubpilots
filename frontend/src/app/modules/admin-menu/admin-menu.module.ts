import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleRouting} from './admin-menu.routing';
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";

@NgModule({
    imports: [
        CommonModule,
        ModuleRouting
    ],
    declarations: [
        AdminMenuComponent
    ]
})
export class AdminMenuModule {
}