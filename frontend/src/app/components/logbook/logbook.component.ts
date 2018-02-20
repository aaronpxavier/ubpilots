import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.css']
})

export class LogbookComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("UBPA Logbook");
  }

  ngOnInit() {
  }

}
