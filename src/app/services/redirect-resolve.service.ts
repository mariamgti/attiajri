import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectResolveService implements Resolve<any>{

  constructor(private router: Router, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any>  {


    let uuid = route.queryParams['uuid'];
    let page = route.queryParams['page'];

    //SI uuid different de null
    if (uuid && page) {
      //get access token 
    
      return new Promise((resolve, reject) => {

        this.authService.obtainAccessToken(uuid).subscribe(token => {
           
          if (uuid && page && token) {

            //store uuid and access token in cookie 
            this.authService.saveParamAuthentication(token, uuid);
      
            //case page
            
            switch(page) { 
              case 'listeCartesDebit': { 
                this.router.navigate(['/listeCartesDebit']);
                 break; 
              } 
              case 'sicavValue': { 
                this.router.navigate(['/sicavValue']);
                 break; 
              } 
              case 'addComplaint': { 
                this.router.navigate(['/addComplaint']);
                 break; 
              } 
              case 'shareAccount': { 
                this.router.navigate(['/shareAccount']);
                 break; 
              } 
              case 'fiabilisation': { 
                this.router.navigate(['/fiabilisation']);
                 break; 
              } 
              case 'listeCartesPrepayees': { 
                this.router.navigate(['/listeCartesPrepayees']);
                 break; 
              } 
              
              default: { 
                this.router.navigate(['/index']);
                break;  
              } 
           } 
           resolve("done");
          }
        }, error => {
          this.router.navigate(['/index']);

        });
      }); 

    }
  }


}