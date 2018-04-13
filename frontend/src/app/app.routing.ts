
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {LogbookComponent} from "./components/logbook/logbook.component";
import {LogbookFormComponent} from "./components/logbook-form/logbook-form.component";
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";

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

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);