import { Component, OnInit } from '@angular/core';
import { HideFooterService } from "../../../services/parent_comp_controls/hide-footer-service.service";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./css/admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private footerService: HideFooterService) {
  }

  ngOnInit() {
    this.footerService.hide();
  }

}
