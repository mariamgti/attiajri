import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Data } from './Data.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService {

  constructor(private router: Router, private data: Data, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const path: string = route.routeConfig.path;

    if (!this.authService.checkCredentials()) {

      this.router.navigate(['/index']);
    }

    else if (!this.data.storage) {
      switch (path) {
        
        case 'confirm-activation-carte-prepaye': {
          return false;
        }
        case 'resultActivation': {
          return false;
        }
        case 'confirm-activation-carte-debit': {
          return false;
        }
        default: {
          return true;
        }
      }
    }

  }


}
