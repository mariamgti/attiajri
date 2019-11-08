import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-not-login',
  templateUrl: './header-not-login.component.html',
  styleUrls: ['./header-not-login.component.scss']
})
export class HeaderNotLoginComponent implements OnInit {
  slide: boolean;
  constructor() { }

  ngOnInit() {
  }
  slideIn() {
    this.slide = true;
  }
}
