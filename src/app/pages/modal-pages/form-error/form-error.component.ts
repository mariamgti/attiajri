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
 
  @Input() invalidMail: boolean;
  @Input() invalidPhone: boolean;
  @Input() show: boolean;
  @Input() commencewithChar: boolean;
 

  ngOnInit() {
  }
  constructor(private router: Router) { }
  close() {
 
    this.invalidMail = false;
    this.invalidPhone = false;
    this.show = false;
    this.commencewithChar=false;
    

  }
}
