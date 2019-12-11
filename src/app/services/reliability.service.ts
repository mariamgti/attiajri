import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ClientModel } from '../models/ClientModel';
import { ConstantParams } from './constantParams/constant.params';
@Injectable({
  providedIn: 'root'
})
export class ReliabilityService {

  constructor(private http: HttpClient, private url: ConstantParams) { }
  GetClient(id): Observable<ClientModel> {
    const params = new HttpParams().set('codeClient', id);
    return this.http.post<ClientModel>('http://localhost:8089/Internship/services/rest' + '/wsClient/findClientByCodeClient', params, {
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
  // PUT
  UpdateClient(codCli, email, phone): Observable<ClientModel> {
    const params = new HttpParams().set('codCli', codCli).set('email', email).set('phone', phone);
    return this.http.post<ClientModel>('http://localhost:8089/Internship/services/rest' + '/wsFiabilisation/updateContactInfo', params, {
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
    let errorMessage = '';
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
