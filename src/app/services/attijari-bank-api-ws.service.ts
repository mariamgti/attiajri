import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConstantParams } from './constantParams/constant.params';
import { Headers } from '@angular/http';
import { Cookie } from 'ng2-cookies';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AttijariBankApiWsService {
  constructor(private http: HttpClient, private constantParams: ConstantParams) { }
  getAccounts(uuid): Observable<Account[]> {
    return this.http.get<Account[]>(this.constantParams.BaseUrlWsApiBanque + 'account/V1/accounts/' + uuid,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  /* getAllAccounts(uuid): Observable<Account[]> {
     const params = new HttpParams().set('uuid', uuid);
 
     return this.http.get<Account[]>(this.constantParams.BaseUrlWsApiBanque + 'account/V1/allaccounts/?'
       + params.toString(), {
       headers: new HttpHeaders({
         'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
         Authorization: 'Bearer ' + Cookie.get('access_token')
       })
     });
 
   }*/
  getLanguage(uuid): Observable<string> {
    return this.http.get<string>(this.constantParams.BaseUrlWsApiBanque + 'subscriber/V1/languagecodes/' + uuid,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

  getLogins(uuid): Observable<string> {
    return this.http.get<string>(this.constantParams.BaseUrlWsApiBanque + 'subscriber/V1/logins/' + uuid
      , {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  getCustomerCodes(uuid): Observable<string> {
    return this.http.get<string>(this.constantParams.BaseUrlWsApiBanque + 'subscriber/V1/customercodes/' + uuid
      , {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
}
