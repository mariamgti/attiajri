import { AbstractControl } from '@angular/forms';

export function ValidatePhone(control: AbstractControl) {
    var  letters = /^[A-Za-z]+$/;
  if (!control.value.startsWith('letters') ) {
    return { validPhone: true };
  }
  return null;
}