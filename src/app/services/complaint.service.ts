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
import { DocumentHeader } from '../models/documentHeader';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient, private constantParams: ConstantParams) { }



  getComplaints(codCli): Observable<Complaint[]> {
    const params = new HttpParams()
    .set('codCli', codCli);
    return this.http.post<Complaint[]>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/getComplaints' ,params,
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
    incedent_date, complaintDocs: Array<ComplaintDoc> ,file): Observable<DocumentHeader> {
    let docs: Array<string> = new Array(complaintDocs.length);
    console.log('here 2', file)

    complaintDocs.forEach(e => {
      console.log('dddd', JSON.stringify(e))
      docs.push(JSON.stringify(e))
    });
    const params = new FormData();
    params.append('codCli', codCli)
    params .append('complDetails', complDetails)
    params.append('inputDate', inputDate)
    params.append('objectCode', objectCode)
    params.append('login', login)
    params.append('phone', phone)
    params.append('homeAddress', homeAddress)
    params.append('city', city)
    params.append('post_code', post_code)
    params.append('code_prof', code_prof)
    params.append('autre_prof', autre_prof)
    params.append('flg_supp', flg_supp)
    params.append('incedent_date', incedent_date)
   
    for (let i = 0; i < file.length; i++) {
      
      params.append('file', file[i])
  }

    console.log("document before join", docs)

    console.log("document sent with ,,,!!!!!!!!!!", JSON.stringify(docs.join(",")))

    return this.http.post<DocumentHeader>(

      this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addComplaint', params
      ,
      {
        headers: new HttpHeaders({
          'Content-type': 'multipart/form-data; charset=utf-8;',
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

  deleteComplaint(complRef): Observable<any> {
    const params = new HttpParams()
    .set('complRef', complRef);
    return this.http.post(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/deleteComplaint',params,
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
  addSurveyResponse(reqponse : response   []) {



    return this.http.post(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addSurveyResponse', reqponse,

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
