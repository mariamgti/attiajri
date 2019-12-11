import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConstantParams } from './constantParams/constant.params';
import { DocumentHeader } from '../models/documentHeader';
@Injectable({
  providedIn: 'root'
})
export class ReliabilityService {

  constructor(private http: HttpClient, private url :ConstantParams) { }
 
    // PUT
    UpdateClient(codCli, email,phone): Observable<DocumentHeader> {
      const  params = new  HttpParams().set('codCli', codCli).set('email', email).set('phone', phone);
      return this.http.post<DocumentHeader>('http://localhost:8089/Internship/services/rest'+'/wsFiabilisation/updateContactInfo' ,params ,{
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
      } )
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
