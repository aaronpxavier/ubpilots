import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot([
          {
              path:'login',
              component: LoginComponent
          },
          {
              path: '',
              component: HomeComponent
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
              path: "**",
              redirectTo:"error"
          }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
