import { Component, OnInit } from '@angular/core';
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private showFooter: boolean;
  constructor(private footerService: HideFooterService) {
    this.showFooter = true;

  }

  ngOnInit() {
    this.footerService.getEventEmitter()
        .subscribe((value) => {
          if (value == 0) {
            this.showFooter = false;
          } else if (value == 1) {
            this.showFooter = true;
          }
        });
  }

}
