import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { transition, trigger, animate, style, } from '@angular/animations';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class FormErrorComponent implements OnInit {
  @Input() invalidClient: boolean;
  @Input() invalidAccount: boolean;
  @Input() invalidMail: boolean;
  @Input() invalidPhone: boolean;
  @Input() invalidProfession: boolean;
  @Input() show: boolean;
  @Input() invalidIncedentDate:boolean;
  @Input() invalidDescription:boolean ;
  @Input() invalidComplaintObject:boolean ;
  @Input() invalidComplaintDoc:boolean ;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidClientChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidAccountChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidMailChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidProfessionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidPhoneChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidIncedentDateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidDescriptionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidComplaintObjectChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidComplaintDocChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
  }
  constructor(private router: Router) { }
  close() {
    this.show = false;
    this.invalidIncedentDate =false;
   this.invalidDescription = false ;
    this.invalidComplaintObject = false ;
    this.invalidComplaintDoc = false ;
    this.invalidClient = false;
    this.invalidAccount = false;
    this.invalidMail = false;
    this.invalidPhone = false;
    this.invalidProfession = false;
    this.invalidClientChange.emit(this.invalidPhone);
    this.invalidAccountChange.emit(this.invalidPhone);
    this.showChange.emit(this.show);
    this.invalidMailChange.emit(this.invalidMail);
    this.invalidProfessionChange.emit(this.invalidProfession);
    this.invalidPhoneChange.emit(this.invalidPhone);

  }
}
