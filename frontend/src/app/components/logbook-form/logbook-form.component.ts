import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";

@Component({
  selector: 'app-logbook-form',
  templateUrl: './logbook-form.component.html',
  styleUrls: ['./logbook-form.component.css']
})
export class LogbookFormComponent implements OnInit {

  constructor(private title: Title, private hideFooterService: HideFooterService) {
    this.title.setTitle('Logbook Form');
    this.hideFooterService.hide();
  }

  ngOnInit() {
  }

}
