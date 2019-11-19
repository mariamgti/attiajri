import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantParams } from './constantParams/constant.params';
import { Observable } from 'rxjs';
import { ShareAccount } from '../models/shareAccount';
import { Cookie } from 'ng2-cookies';
import { PortFeuille } from '../models/portFeuille';

@Injectable({
  providedIn: 'root'
})
export class ShareAccountService {

  
  constructor(private http: HttpClient, private constantParams: ConstantParams) { }



  getShareAccounts(numCpt): Observable<ShareAccount[]> {
    return this.http.get<ShareAccount[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsShareAccount/getShareAccounts?numCpt=' +numCpt,
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
