import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
type PaneType = 'left' | 'right';
@Component({
  selector: 'app-slide-in',
  templateUrl: './slide-in.component.html',
  styleUrls: ['./slide-in.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})
export class SlideInComponent implements OnInit {
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
