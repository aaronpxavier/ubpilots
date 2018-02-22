import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HideNavMenuService } from './services/parent_comp_controls/hide-nav-menu.service';
import { HideFooterService } from './services/parent_comp_controls/hide-footer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public constructor(private titleService: Title,
                       public menuService: HideNavMenuService,
                       public footerService: HideFooterService) {
        this.titleService.setTitle("Loading..");
    }

}
