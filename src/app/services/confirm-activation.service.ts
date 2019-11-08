import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmActivationService {
  constructor() { }
  checkEmptyPassword(password: string): boolean {
    if (password.length === 0) {
      console.log(" password is required !!!")
      return false;
    }
  }
  checkPassword(password: string): boolean {
    if (password != "1" && password.length != 0) {
      console.log("password incorrect!!!")
      return false;
    }
    else return true;
  }
}
