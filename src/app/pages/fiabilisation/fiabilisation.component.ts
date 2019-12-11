import { Component, OnInit } from '@angular/core';
import { ReliabilityService } from 'src/app/services/reliability.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatePhone } from '../../validators/phone.validator';
@Component({
  selector: 'app-fiabilisation',
  templateUrl: './fiabilisation.component.html',
  styleUrls: ['./fiabilisation.component.scss'], animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translatey(100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class FiabilisationComponent implements OnInit {
  selectedLevel1;
  client;
  registerForm: FormGroup;
  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  invalidMail: boolean = false;
  invalidPhone: boolean = false;
  showFormError: boolean = false;
  commencewithchar: boolean = false;
  static validPhone = false;
  constructor(private reliabilityService: ReliabilityService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), ValidatePhone]),
    });

  }

  // Issues list
  loadClient(id) {
    return this.reliabilityService.GetClient(id).subscribe((data: {}) => {
      this.client = data;
     

    })
  }
  selectedShareAcc() {

    this.loadClient(this.selectedLevel1);


  }
  static checkChar(control: AbstractControl) {
    var letters = /^[A-Za-z]+$/;
    if (!control.value.startsWith(letters)) {
      return { 'this.validPhone': true };
    }
    return null;
  }
  onSubmit() {
    if (this.registerForm.get('email').invalid) {
      this.showFormError = true;
      this.invalidMail = true;

    }

    if (this.registerForm.get('phone').invalid) {
      this.showFormError = true;
      this.invalidPhone = true;
    }
    return this.reliabilityService.UpdateClient(this.selectedLevel1, this.client.email, this.client.phone).subscribe((data: {}) => {
      this.client = data;

      if (this.client.resultCode == "0000") {
        this.submitted = true;

        this.registerForm.reset();
      }



    })
  }
  Dismiss() {

    this.submitted = false;

  }
}
