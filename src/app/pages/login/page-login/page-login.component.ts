import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie, CookieService } from 'ng2-cookies';
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
    /*
       // intercepter uuid  and page
       this.activatedRoute.queryParams.subscribe(params => {
         this.uuid = params['uuid'];
         this.page = params['page'];
   
         console.log(params)
         //SI uuid different de null
       if (this.uuid && this.page) {
         //get access token 
         this.authService.obtainAccessToken(this.uuid).subscribe(data => {
           //store uuid and access token in cookie 
           this.token = data;
           this.authService.saveParamAuthentication(data,this.uuid);
         
            //if uuid and access token are valid
           if (this.uuid && this.token) {
   
             //case page
             //if page == carte navigate to listCarte
             if (this.page === 'listeCartes') {
               this.router.navigate(['/listeCartes']);
             }
             //else page login
           
     
           }
           //else  page login
           
   
         });
          
         
   
       }
       //else  page login 
       }
       );
   
       
      */

  }
  num1: number = 12.638467846;
  num2: number = 0.5;
}
