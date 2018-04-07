import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import { AdminMenuComponent } from "./admin-menu/admin-menu.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminMenuComponent,
    }
];

export const AdminMenuRouting: ModuleWithProviders = RouterModule.forChild(routes);