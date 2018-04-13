import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminMenuRouting} from './admin-menu.routing';
import {AdminMenuComponent} from "./admin-menu/admin-menu.component";
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
    imports: [
        CommonModule,
        AdminMenuRouting,
        MatCardModule,
        MatGridListModule
    ],
    declarations: [
        AdminMenuComponent
    ]
})
export class AdminMenuModule {
}