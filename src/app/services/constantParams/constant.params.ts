import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantParams {
  public BaseUrlWsClient = 'http://localhost:8089/WSAttijari/services/rest/';
 // public BaseUrlWsApiBanque = 'https://www.attijarimobile.homo.com.tn/';

 public BaseUrlWsApiBanque = 'http://localhost:8089/Internship/';
 // public BaseUrlWsApiBanque = 'http://localhost:8089/WSAttijari/'
  public BaseUrlOauthToken = this.BaseUrlWsApiBanque+'oauth/token';
  public BaseUrlWsBanque = 'http://172.28.11.33:7080/ABTServiceMiddleware/';
 // public BaseUrlWsBanque = 'http://172.25.13.8:8080/ABTServiceMiddleware/';
 public BaseUrlWsElargissementAttijariMob = 'http://localhost:8089/Internship/services/rest/'
  
}