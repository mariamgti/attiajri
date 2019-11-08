import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class BgHeaderAuthComponent implements OnInit {
  slide: boolean;
  load: boolean;
  deconnect: boolean;
  show: boolean;
  constructor(private router: Router) { }
  ngOnInit() {
  }
  deconnection() {
    this.deconnect = true;
    this.show = true;
  }
  slideIn() {
    this.slide = true;
  }
  redirectHome() {
    this.load = true;
    setTimeout(() => {
      this.router.navigateByUrl("/index");
      this.load = false;
    }, 3000);
  }
}
