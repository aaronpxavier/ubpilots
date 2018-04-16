import { Component, OnInit } from '@angular/core';
import { HideFooterService } from "../../../services/parent_comp_controls/hide-footer-service.service";
import { LogbookService, LogEntry } from "../../../services/api-services/logbook.service";

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  public logs: LogEntry[];
  constructor(private footerService: HideFooterService, private logbookService: LogbookService) {
    logbookService.getLogs()
        .then(doc => {
            this.logs = doc
            console.log(this.logs);
        });

  }

  ngOnInit() {
    this.footerService.hide();
  }

    deleteClick(i: number) {
        this.logbookService.deleteLog(this.logs[i]._id)
            .then((res) => {
            if(res.success) this.logs.splice(i,1);
        });;
    }

    approveClick(i: number) {
        console.log(this.logs[i]._id);
        this.logbookService.confirmLog(this.logs[i]._id)
            .then((res) => {
                if(res.success) this.logs.splice(i,1);
            });
    }
}
