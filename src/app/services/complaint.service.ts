import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { Complaint } from '../models/Complaint';
import { ComplaintDoc } from '../models/ComplaintDoc';
import { ComplaintObject } from '../models/ComplaintObject';
import { DocumentHeader } from '../models/DocumentHeader';
import { Profession } from '../models/Profession';
import { Question } from '../models/question';
import { ConstantParams } from './constantParams/constant.params';
@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  constructor(private http: HttpClient, private constantParams: ConstantParams) { }
  getComplaints(codCli): Observable<Complaint[]> {
    const params = new HttpParams()
      .set('codCli', codCli);
    return this.http.post<Complaint[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getComplaints', params,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  getComplaintDocs(complRef): Observable<ComplaintDoc[]> {
    return this.http.get<ComplaintDoc[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getComplaintDocs?complRef=' + complRef,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  addComplaint(codCli, objectCode, complDetails, inputDate, login, phone, email, homeAddress, city, postCode,
    codeProf, autreProf, flgSupp, incedentDate, accountNum, file): Observable<DocumentHeader> {
    const params = new FormData();
    params.append('codCli', codCli)
    params.append('complDetails', complDetails)
    params.append('inputDate', inputDate)
    params.append('objectCode', objectCode)
    params.append('login', login)
    params.append('phone', phone)
    params.append('email', email)
    params.append('homeAddress', homeAddress)
    params.append('city', city)
    params.append('postCode', postCode)
    params.append('codeProf', codeProf)
    params.append('autreProf', autreProf)
    params.append('flgSupp', flgSupp)
    params.append('incedentDate', incedentDate)
    params.append('accountNum',accountNum)
    for (let i = 0; i < file.length; i++) {
      params.append('file', file[i])
    }
    return this.http.post<DocumentHeader>(
      this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addComplaint', params,
      {
        headers: new HttpHeaders({
          'Content-type': 'multipart/form-data; charset=utf-8;',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  updateComplaint(complRef, objectCode, complDetails, inputDate, login, phone, email, homeAddress, city, postCode, codeProf,
    autreProf, flgSupp,codCli, incedentDate,accountNum, file):
    Observable<DocumentHeader> {
    const params = new FormData();

    params.append('complRef', complRef)
    params.append('objectCode', objectCode)
    params.append('complDetails', complDetails)
    params.append('inputDate', inputDate)
    params.append('login', login)
    params.append('phone', phone)
    params.append('email', email)
    params.append('homeAddress', homeAddress)
    params.append('city', city)
    params.append('postCode', postCode)
    params.append('codeProf', codeProf)
    params.append('autreProf', autreProf)
    params.append('flgSupp', flgSupp)
    params.append('codCli',codCli)
    params.append('incedentDate', incedentDate)
    params.append('accountNum',accountNum)
    for (let i = 0; i < file.length; i++) {
      params.append('file', file[i])
    }
    return this.http.post<DocumentHeader>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/updateComplaint', params,
      {
        headers: new HttpHeaders({
          'Content-type': 'multipart/form-data; charset=utf-8;',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  deleteComplaint(complRef): Observable<any> {
    const params = new HttpParams()
      .set('complRef', complRef);
    return this.http.post(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/deleteComplaint', params,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  getSurvey(): Observable<Question[]> {
    return this.http.get<Question[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getSurvey',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  addSurveyResponse(responses): Observable<DocumentHeader> {
    return this.http.post<DocumentHeader>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addSurveyResponse', responses,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  getProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getProfessions',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
  getAllcomplaintObjects(): Observable<ComplaintObject[]> {
    return this.http.get<ComplaintObject[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getAllcomplaintObjects',
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }
}
