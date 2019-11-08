import { Injectable } from '@angular/core';
import { ConstantParams } from './constantParams/constant.params';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListCartesMxp } from '../models/listCartesMxp';
import { DocumentHeader } from '../models/documentHeader';
import { ResponseDocumentHeader } from '../models/ResponseDocumentHeader';

@Injectable({
  providedIn: 'root'
})
export class CartesMxpWS {
  constructor(private http: HttpClient, private constantParams: ConstantParams) { }
  getInfoCartesByCompte(age, ncp): Observable<ListCartesMxp> {
    const body = {
      'age': age,
      'ncp': ncp
    };
    return this.http.post<any>(this.constantParams.BaseUrlWsBanque + 'monetique/cartesMxp/getInfoCartesByCompte', JSON.stringify(body),
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            Authorization: 'Basic N2UyNjdiMjc2MTE4ZmFlMzdkNTRiMjMyM2IyNzM0M2I6NDFmZDkzMGU1Yzk3MDM4ZTU5MjkxYmMzZmI4NTY5MGU='
          }
        )
      }
    );
  }
  getInfoCarte(age, ncp, numCarte): Observable<ListCartesMxp> {
    const body = {
      'age': age,
      'ncp': ncp,
      'numCarte': numCarte
    };
    return this.http.post<any>(this.constantParams.BaseUrlWsBanque + 'monetique/cartesMxp/getInfoCarte', JSON.stringify(body),
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            Authorization: 'Basic N2UyNjdiMjc2MTE4ZmFlMzdkNTRiMjMyM2IyNzM0M2I6NDFmZDkzMGU1Yzk3MDM4ZTU5MjkxYmMzZmI4NTY5MGU='
          }
        )
      }
    );
  }
  opposerCarte(): Observable<DocumentHeader> {
    return this.http.post<any>(this.constantParams.BaseUrlWsBanque + 'monetique/cartesMxp/opposerCarte', JSON.stringify(
      {
        "age": "",
        "ncp": "",
        "numCarte": ""
      }
    ),
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            Authorization: 'Basic N2UyNjdiMjc2MTE4ZmFlMzdkNTRiMjMyM2IyNzM0M2I6NDFmZDkzMGU1Yzk3MDM4ZTU5MjkxYmMzZmI4NTY5MGU='
          }
        )
      }
    );
  }
  desactiverCarte(age, ncp, numCarte, codeStatut): Observable<ResponseDocumentHeader> {
    const body = {
      'age': age,
      'ncp': ncp,
      'numCarte': numCarte,
      "codeStatut": codeStatut
    };
    return this.http.post<any>(this.constantParams.BaseUrlWsBanque + 'monetique/cartesMxp/desactiverCarte', JSON.stringify(body),
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            Authorization: 'Basic N2UyNjdiMjc2MTE4ZmFlMzdkNTRiMjMyM2IyNzM0M2I6NDFmZDkzMGU1Yzk3MDM4ZTU5MjkxYmMzZmI4NTY5MGU='
          }
        )

      }
    );
  }
  activerCarte(age, ncp, numCarte, codeStatut): Observable<ResponseDocumentHeader> {
    const body = {
      'age': age,
      'ncp': ncp,
      'numCarte': numCarte,
      "codeStatut": codeStatut
    };
    return this.http.post<any>(this.constantParams.BaseUrlWsBanque + 'monetique/cartesMxp/activerCarte', JSON.stringify(body),
      {
        headers: new HttpHeaders(
          {
            'Content-type': 'application/json',
            Authorization: 'Basic N2UyNjdiMjc2MTE4ZmFlMzdkNTRiMjMyM2IyNzM0M2I6NDFmZDkzMGU1Yzk3MDM4ZTU5MjkxYmMzZmI4NTY5MGU='
          }
        )
      }
    );
  }
}
