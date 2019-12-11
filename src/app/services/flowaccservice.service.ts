import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AccountModel } from '../models/AccountModel';
import { ShareAccount } from '../models/ShareAccount';
import { ConstantParams } from './constantParams/constant.params';
@Injectable({
  providedIn: 'root'
})
export class FlowaccserviceService {
  // Base url

  constructor(public http: HttpClient, public base: ConstantParams) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    })
  };
  GetFlowAccount(): Observable<AccountModel[]> {
    const params = new HttpParams().set('codeClient', "1");


    return this.http.post<AccountModel[]>(this.base.BaseUrlWsElargissementAttijariMob +'wsCompte/findCompteByCodeClient' ,params,{
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  GetShareAccount(numCpt): Observable<ShareAccount[]> {
    const params = new HttpParams().set('numCpt', numCpt);

  
    return this.http.post<ShareAccount[]>(this.base.BaseUrlWsElargissementAttijariMob +'wsShareAccount/getShareAccounts' ,params,{
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  GetWallets(shareAccNumber): Observable<ShareAccount[]> {
    const params = new HttpParams().set('shareAccNumber', shareAccNumber);

 
    return this.http.post<ShareAccount[]>(this.base.BaseUrlWsElargissementAttijariMob +'wsShareAccount/getPortFeuilles' ,params,{
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    })
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  // Error handling
  errorHandl(error) {
    let errorMessage = 'flow account';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
