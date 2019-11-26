import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstantParams } from './constantParams/constant.params';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { Complaint } from '../models/complaint';
import { ComplaintDoc } from '../models/complaintDoc';
import { Question } from '../models/question';
import { Profession } from '../models/profession';
import { ComplaintObject } from '../models/complaintObject';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient, private constantParams: ConstantParams) { }



  getComplaints(codCli): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getComplaints?codCli=' + codCli,
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
  addComplaint(codCli, complDetails, inputDate, 
    objectCode, login, phone, homeAddress,
     city, post_code,
    code_prof, autre_prof, flg_supp, 
    incedent_date,complaintDocs): Observable<object[]> {

    const params = new HttpParams()
      .set('codCli', codCli)
      .set('complDetails', complDetails)
      .set('inputDate', inputDate)
      .set('objectCode', objectCode)
      .set('login', login)
      .set('phone', phone)
      .set('homeAddress', homeAddress)
      .set('city', city)
      .set('post_code', post_code)
      .set('code_prof', code_prof)
      .set('autre_prof', autre_prof)
      .set('flg_supp', flg_supp)
      .set('incedent_date', incedent_date)
      .set('complaintDocs',complaintDocs)


    return this.http.post<object[]>(

      this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addComplaint', params.toString()
      ,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8;',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

  updateComplaint(complRef, complDetails, inputDate, complTreatmentDate, state, bankResponse): Observable<Complaint> {


    const params = new HttpParams()
      .set('complRef', complRef)
      .set('complDetails', complDetails)
      .set('inputDate', inputDate)
      .set('complTreatmentDate', complTreatmentDate)
      .set('state', state)
      .set('bankResponse', bankResponse);
    return this.http.post<Complaint>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/updateComplaint', params.toString(),

      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8;',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

  deleteComplaint(complRef) {
    return this.http.delete(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/deleteComplaint?complRef=' + complRef,
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
  addSurveyResponse(questref, complRef, response) {

    const params = new HttpParams()
      .set('complaintRef', complRef)
      .set('questref', questref)
      .set('response', response)

    return this.http.post(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addSurveyResponse', params.toString(),

      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
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
