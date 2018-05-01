
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from "@angular/platform-browser";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { LoginService } from "../../services/api-services/login.service";
import { Location } from '@angular/common';
import {Router} from "@angular/router";
import { LogbookComponent } from '../logbook/logbook.component';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-logbook-form-dialog-box',
  templateUrl: './logbook-form-dialog-box.component.html',
  styleUrls: ['./logbook-form-dialog-box.component.css']
})
export class LogbookFormDialogBoxComponent implements OnInit {
    public model = {
        picFirst: "",
        picLast: "",
        sicFirst: "",
        sicLast: "",
        dep: "",
        dest: "",
        aircafts: [],
        ac: "",
        night: 0,
        imc: 0,
        total: "",
        takeoffs: "",
        landings: "",
    }
  public form:  FormGroup;
  public picFirst: string;
  public picLast: string;
  public sicFirst: string;
  public sicLast: string;
  public dep: string;
  public dest: string;
  public aircafts = ['C-172','PA-28'];
  public ac: string;
  public night: number;
  public imc: number;
  public total: number;
  public takeoffs: number;
  public landings: number;
  private isAdmin: boolean;

  constructor(
    public dialogRef: MatDialogRef<LogbookFormDialogBoxComponent>, 
    private hideFooterService: HideFooterService,
    private logService:LogbookService,
    private loginService: LoginService,
    private location: Location,
    private router:Router,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {let token = loginService.getTokenFromLocal();
      if(token)
          this.isAdmin = token.isAdmin;
      else
          router.navigateByUrl('/log');
      this.hideFooterService.hide();
  }

  ngOnInit() {
      this.loginService.getSignOutEmitter().subscribe(() => {
          this.router.navigateByUrl('/log');
      })
     this.picFirst = "";
     this.picLast = "";
     this.sicFirst = "";
     this.sicLast = "";
     this.night =0;
     this.imc = 0;
  }

  

  buildJson(): any {
      let jsonEntry =
          {
              picFirst: this.picFirst,
              picLast: this.picLast,
              sicFirst: this.sicFirst,
              sicLast: this.sicLast,
              acAbrev: '',
              isJet: false,
              noEngines: 1,
              dep: this.dep,
              dest: this.dest,
              imc: this.imc,
              to: this.takeoffs,
              lands: this.landings,
              total: this.total,
              night: this.night
          };
          jsonEntry.acAbrev = this.ac;
          return jsonEntry;
    }

  submit() {

    this.logService.postLogs(this.buildJson())

        .then(() => {
            this.router.navigateByUrl('/log');
        }).catch(err => console.log(err));
        this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

 