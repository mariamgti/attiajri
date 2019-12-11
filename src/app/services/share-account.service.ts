import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { PortFeuille } from '../models/PortFeuille';
import { ShareAccount } from '../models/ShareAccount';
import { ConstantParams } from './constantParams/constant.params';

@Injectable({
  providedIn: 'root'
})
export class ShareAccountService {


  constructor(private http: HttpClient, private constantParams: ConstantParams) { }



  getShareAccounts(numCpt): Observable<ShareAccount[]> {
    return this.http.get<ShareAccount[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsShareAccount/getShareAccounts?numCpt=' + numCpt,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }


  getPortFeuilles(shareAccNumber): Observable<PortFeuille[]> {
    return this.http.get<PortFeuille[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsShareAccount/getPortFeuilles?shareAccNumber=' + shareAccNumber,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
}
