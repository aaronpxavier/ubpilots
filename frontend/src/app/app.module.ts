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
import { LogbookService } from "./services/api-services/logbook.service";
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UBEmailValidator} from './components/Validators/ub-email-validator.directive'
import {ConfirmPassword} from './components/Validators/confirm-password-validator.directive'
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LogbookFormComponent } from './components/logbook-form/logbook-form.component';


@NgModule({
  declarations: [
      ConfirmPassword,
      UBEmailValidator,
      AppComponent,
      LoginComponent,
      HomeComponent,
      ErrorComponent,
      ImgCropperComponent,
      ImageCropperComponent,
      FooterComponent,
      LogbookComponent,
      SignupComponent,
      NavComponent,
      LogbookFormComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
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
      ]),
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      NgbModule.forRoot()
  ],
  providers: [ Title, HideNavMenuService, HideFooterService, LoginService, LogbookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
