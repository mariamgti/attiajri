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
@Input() emailValue:string;
@Input() phoneValue:string;
@Input() emailChanged:boolean;
@Input() phoneChanged:boolean;
@Input() serverError:boolean;
@Input() infoNotChanged:boolean;
@Input() deleted: boolean;
@Input() Notdeleted: boolean;
@Input() affecte:boolean;
@Input() invalidMail: boolean;
@Input() invalidPhone: boolean;
@Input() warning:string;
  @Input() invalidProfession: boolean;
  @Input() invalidOtherProfession: boolean;
  @Input() invalidAccount: boolean;
  @Input() invalidClient: boolean;
  @Input() show: boolean;
  @Input() invalidIncedentDate: boolean;
  @Input() invalidDescription: boolean;
  @Input() invalidComplaintObject: boolean;
  @Input() invalidComplaintDoc: boolean;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidClientChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidAccountChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidMailChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidProfessionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidOtherProfessionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidPhoneChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidIncedentDateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidDescriptionChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidComplaintObjectChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() invalidComplaintDocChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deletedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() NotdeletedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() affecteChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emailChangedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() phoneChangedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() serverErrorChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() infoNotChangedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() warningChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() emailValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() phoneValueChange: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {
  }
  constructor(private router: Router) { }
  close() {
    this.show = false;
    this.invalidMail = false;
    this.invalidPhone = false;
    this.invalidProfession = false;
    this.invalidAccount = false;
    this.invalidClient = false;
    this.invalidOtherProfession = false;
    //
  
    this.deleted = false;
    this.Notdeleted=  false;
    this.affecte=false;
   
    this.emailChanged=false;
    this.phoneChanged=false;
    this.serverError=false;
    this.infoNotChanged=false;
    //
    this.deletedChange.emit(this.deleted);
    this.NotdeletedChange.emit(this.Notdeleted);
    //
    this.showChange.emit(this.show);
    this.invalidMailChange.emit(this.invalidMail);
    this.invalidPhoneChange.emit(this.invalidPhone);
    this.affecteChange.emit(this.affecte);
    this.emailValueChange.emit(this.emailValue);
    this.phoneValueChange.emit(this.phoneValue);
    this.emailChangedChange.emit(this.emailChanged);
    this.serverErrorChange.emit(this.serverError);
    this.infoNotChangedChange.emit(this.infoNotChanged);
    //
    this.invalidProfessionChange.emit(this.invalidProfession);
    this.invalidOtherProfessionChange.emit(this.invalidOtherProfession);   
    this.invalidIncedentDateChange.emit(this.invalidIncedentDate);
    this.invalidDescriptionChange.emit(this.invalidDescription);
    this.invalidComplaintObjectChange.emit(this.invalidComplaintObject);
    this.invalidComplaintDocChange.emit(this.invalidComplaintDoc);
    this.invalidClientChange.emit(this.invalidClient);
    this.invalidAccountChange.emit(this.invalidAccount);
    this.warningChange.emit(this.warning);
  }
}
