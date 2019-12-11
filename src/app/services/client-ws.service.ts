import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import 'rxjs';
import { Observable, of, Subject } from 'rxjs';
import { AccountModel } from '../models/AccountModel';
import { ClientModel } from '../models/ClientModel';
import { DebitCardModel } from '../models/DebitCardModel';
import { PrepaidCardModel } from '../models/PrepaidCardModel';
import { ConstantParams } from './constantParams/constant.params';
@Injectable({
  providedIn: 'root'
})
export class ClientWsService {
  private prepaidCards;
  prepaidCardSubject = new Subject<PrepaidCardModel[]>();
  constructor(private http: HttpClient, private constantParams: ConstantParams) { }
  findClientByCodeClient(codeClient): Observable<ClientModel> {
    const params = new HttpParams().set('codeClient', codeClient);
    return this.http.post<ClientModel>(this.constantParams.BaseUrlWsClient + 'wsClient/findClientByCodeClient?',
      params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }

  findClientRattByLogin(login): Observable<ClientModel[]> {
    const params = new HttpParams().set('login', login);
    return this.http.post<ClientModel[]>(this.constantParams.BaseUrlWsClient + 'wsClient/findClientRattByLogin?',
      params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }
  findCompteByCodeClient(codeClient): Observable<AccountModel[]> {
    const params = new HttpParams().set('codeClient', codeClient);
    return this.http.post<AccountModel[]>(this.constantParams.BaseUrlWsClient + 'wsCompte/findCompteByCodeClient?'
      , params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }
  findCarteDebitBynumCpt(numCpt): Observable<DebitCardModel> {
    const params = new HttpParams().set('numCpt', numCpt);
    return this.http.post<DebitCardModel>(this.constantParams.BaseUrlWsClient + 'wsCarteDebit/findCarteDebitBynumCpt?', params.toString(),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  desactiverCarteD(numCarteD): Observable<any> {
    const params = new HttpParams().set('numCarteD', numCarteD);
    return this.http.post<DebitCardModel>(this.constantParams.BaseUrlWsClient + 'wsCarteDebit/desactiverCarteD?'
      , params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }
  activerCarteD(numCarteD): Observable<any> {
    const params = new HttpParams().set('numCarteD', numCarteD);
    return this.http.post(this.constantParams.BaseUrlWsClient + 'wsCarteDebit/activerCarteD?'
      , params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }
  desactiverCarteP(numCarteP): Observable<any> {
    const params = new HttpParams().set('numCarteP', numCarteP);
    return this.http.post<DebitCardModel>(this.constantParams.BaseUrlWsClient + 'wsCartePrepayee/desactiverCarteP?', params.toString(),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  activerCarteP(numCarteP): Observable<any> {
    const params = new HttpParams().set('numCarteP', numCarteP);
    return this.http.post(this.constantParams.BaseUrlWsClient + 'wsCartePrepayee/activerCarteP?', params.toString(),
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  findCartePrepayeeBycodCli(codCli): Observable<PrepaidCardModel> {
    const params = new HttpParams().set('codCli', codCli);
    return this.http.post<PrepaidCardModel>(this.constantParams.BaseUrlWsClient + 'wsCartePrepayee/findCartePrepayeeBycodCli?'
      , params.toString(), {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Bearer ' + Cookie.get('access_token')
      })
    });
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      return of(result as T);
    };
  }
  emitPrepaidCards() {
    this.findCartePrepayeeBycodCli(1).subscribe((data: {}) => {
      this.prepaidCards = data;
    });
    this.prepaidCardSubject.next(this.prepaidCards.slice());
  }
}


