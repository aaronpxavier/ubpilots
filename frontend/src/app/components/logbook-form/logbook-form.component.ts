import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { LoginService } from "../../services/api-services/login.service";
import { Location } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logbook-form',
  templateUrl: './logbook-form.component.html',
  styleUrls: ['./logbook-form.component.css']
})
export class LogbookFormComponent implements OnInit {
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
  constructor(private title: Title,
              private hideFooterService: HideFooterService,
              private logService:LogbookService,
              private loginService: LoginService,
              private location: Location,
              private router:Router) {
      let token = loginService.getTokenFromLocal();
      if(token)
          this.isAdmin = token.isAdmin;
      else
          router.navigateByUrl('/log');
      this.title.setTitle('Logbook Form');
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

  }

}