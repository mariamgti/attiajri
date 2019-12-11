import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmActivationService {
  constructor() { }
  checkEmptyPassword(password: string): boolean {
    if (password.length === 0) {
    
      return false;
    }
  }
  checkPassword(password: string): boolean {
    if (password != "1" && password.length != 0) {
      
      return false;
    }
    else return true;
  }
}
