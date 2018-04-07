import {ErrorComponent} from "./components/error/error.component";
import {LogbookComponent} from "./components/logbook/logbook.component";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {LogbookFormComponent} from "./components/logbook-form/logbook-form.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'log',
        component: LogbookComponent
    },
    {
        path: 'log/form',
        component: LogbookFormComponent
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'error',
        pathMatch: 'full',
        component: ErrorComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: "**",
        redirectTo: "error"
    }
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
