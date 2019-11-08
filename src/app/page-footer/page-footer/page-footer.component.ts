import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {
  infop: boolean;
  show: boolean;
  constructor() { }

  ngOnInit() {
  }
  infopratique() {

    this.infop = true;
    this.show = true;
  }
}
