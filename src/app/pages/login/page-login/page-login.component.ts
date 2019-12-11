import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  param = { value: 'world' };
  page: any;
  uuid: any;
  token: any;
  currentRoute: any;
  cartesMxp: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }
  ngOnInit() {

  }
  num1: number = 12.638467846;
  num2: number = 0.5;
}
