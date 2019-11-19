import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConstantParams } from './constantParams/constant.params';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { Complaint } from '../models/complaint';
import { ComplaintDoc } from '../models/complaintDoc';
import { Question } from '../models/question';

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

  addComplaint(codCli, complDetails, inputDate, complTreatmentDate, state, bankResponse): Observable<Complaint> {
    const params = new HttpParams()
    .set('codCli', codCli)
      .set('complDetails',complDetails)
      .set('inputDate', inputDate)
      .set('complTreatmentDate', complTreatmentDate)
      .set('state', state)
      .set('bankResponse', bankResponse);
   
    return this.http.post<Complaint>(
      //'http://localhost:8090/Internship/services/rest/wsComplaint/addComplaint?codCli=1&complDetails=complaint details here &inputDate=12/12/2019&complTreatmentDate=18/01/2019&state=not handled&bankResponse=in progress'
      
    this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addComplaint',params.toString()
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
      .set('complDetails',complDetails)
      .set('inputDate', inputDate)
      .set('complTreatmentDate', complTreatmentDate)
      .set('state', state)
      .set('bankResponse', bankResponse);
    return this.http.post<Complaint>(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/updateComplaint' ,params.toString(),
    
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
  addSurveyResponse(questref, response) {
    return this.http.post(this.constantParams.BaseUrlWsElargissementAttijariMob + 'wsComplaint/addSurveyResponse?questref=' + questref + '?response=' + response,
      {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: 'Bearer ' + Cookie.get('access_token')
        })
      });
  }

}
