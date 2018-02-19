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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    ImgCropperComponent,
      ImageCropperComponent,
      FooterComponent
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
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
