import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-pratique',
  templateUrl: './info-pratique.component.html',
  styleUrls: ['./info-pratique.component.scss'],
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
export class InfoPratiqueComponent implements OnInit {

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
