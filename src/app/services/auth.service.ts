import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { ConstantParams } from './constantParams/constant.params';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private constantParams: ConstantParams, private router: Router) { }
  //auth service
  /*  obtainAccessToken(uuid): Observable<any> {
      const params = new HttpParams()
      .set('username', 'IDAPPLI')
      .set('password', 'Pass@rdIDappli1')
      .set('grant_type', 'password')
      .set('client_id', 'IDHTTP')
      .set('client_secret', 'Pass@rdIDhttp1')
      .set('scope', 'read,write');
      
      return this.http.post(this.constantParams.BaseUrlOauthToken+'?'+uuid, params.toString(),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });  
    }*/
  obtainAccessToken(uuid): Observable<any> {
    const params = new HttpParams().set('username', 'app')
      .set('password', '123')
      .set('grant_type', 'password')
      .set('client_id', 'app')
      .set('client_secret', '$2a$10$V3mK3RKzeO/g1zkoN3qP6.JLaX50F5dfLzEixlKuQDp/UAh.3EWgS');
    return this.http.post(this.constantParams.BaseUrlOauthToken, params.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
  //auth service
  saveParamAuthentication(token, uuid) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('uuid', uuid, expireDate);
  }
  checkCredentials(): boolean {
    if
      (
      Cookie.get('uuid') && Cookie.get('access_token')) {
      return true;
    }
    else {
      this.router.navigate(['/index']);
      return false;
    }
  }
}
