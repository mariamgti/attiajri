
import {
  Component, OnInit, Input, Output, OnChanges, EventEmitter,
} from '@angular/core';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-password-required',
  templateUrl: './password-required.component.html',
  styleUrls: ['./password-required.component.scss'],
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
export class PasswordRequiredComponent implements OnInit {
  @Input() show: boolean;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
  }
  constructor(private router: Router) { }
  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}




