import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  previousUrl: string;
  constructor(private authService: AuthService, private router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(e => {
       
      });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.checkCredentials) {
      return true;
    }
    else {
      this.router.navigate(['/auth']);
    }
  }
}