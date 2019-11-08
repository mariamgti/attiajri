import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
type PaneType = 'left' | 'right';
@Component({
  selector: 'app-slide-in-login',
  templateUrl: './slide-in-login.component.html',
  styleUrls: ['./slide-in-login.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SlideInLoginComponent implements OnInit {
  @Input() slide: boolean;
  @Output() slideChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
  }
  constructor() { }
  close() {
    this.slide = false;
    this.slideChange.emit(this.slide);
  }
}
