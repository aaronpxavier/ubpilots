import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ImgCropperComponent } from './components/img-cropper/img-cropper.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogbookComponent } from './components/logbook/logbook.component';
import { SignupComponent } from './components/signup/signup.component';
import { HideNavMenuService } from './services/parent_comp_controls/hide-nav-menu.service';
import { HideFooterService } from './services/parent_comp_controls/hide-footer-service.service';
import { LoginService } from './services/api-services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      ErrorComponent,
      ImgCropperComponent,
      ImageCropperComponent,
      FooterComponent,
      LogbookComponent,
      SignupComponent,
      NavComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot([
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
      ])
  ],
  providers: [ Title, HideNavMenuService, HideFooterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
