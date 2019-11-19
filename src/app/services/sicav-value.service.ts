import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantParams } from './constantParams/constant.params';
import { Observable } from 'rxjs';
import { SicavValue } from '../models/sicavValue';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class SicavValueService {

  constructor(private http: HttpClient, private constantParams: ConstantParams) { }



  getSicavValues(): Observable<SicavValue[]> {
    return this.http.get<SicavValue[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsSicavValue/getSicavValues' ,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
}
