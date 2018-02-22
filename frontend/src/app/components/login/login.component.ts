import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HideNavMenuService } from '../../services/parent_comp_controls/hide-nav-menu.service';
import {HideFooterService} from '../../services/parent_comp_controls/hide-footer-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private titleService: Title,
              public menuService: HideNavMenuService,
              public footerService: HideFooterService) {
        this.titleService.setTitle("Login");
        this.menuService.hide();
        this.footerService.hide();
        console.log(this.menuService.getState());
  }g

  ngOnInit() {
  }

}
