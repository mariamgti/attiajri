import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { ConstantParams } from './constantParams/constant.params';

@Injectable({
  providedIn: 'root'
})
export class FiabilisationService {

  constructor(private http: HttpClient, private constantParams: ConstantParams) { }

  getContactInfo(codCli): Observable<Object[][]> {
    return this.http.get<Object[][]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsFiabilisation/getContactInfo?codCli=' + codCli,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

  updateContactInfo(codCli, email, phone, city, postCode, homeAddress): Observable<Object[][]> {

    const params = new HttpParams()
      .set('codCli', codCli)
      .set('email', email)
      .set('phone', phone)
      .set('city', city)
      .set('postCode', postCode)
      .set('homeAddress', homeAddress);
    return this.http.put<Object[][]>(this.constantParams.BaseUrlWsElargissementAttijariMob +
      'wsFiabilisation/updateContactInfo', params.toString(),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

}
