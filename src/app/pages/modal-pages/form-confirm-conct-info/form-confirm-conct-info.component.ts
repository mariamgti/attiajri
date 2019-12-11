import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-form-confirm-conct-info',
  templateUrl: './form-confirm-conct-info.component.html',
  styleUrls: ['./form-confirm-conct-info.component.scss'],
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
export class FormConfirmConctInfoComponent implements OnInit {
  constructor(

    public dialogRef: MatDialogRef<FormConfirmConctInfoComponent>, @Inject(MAT_DIALOG_DATA) public data) { }



  ngOnInit() {

  }



  onNoClick(): void {

    this.dialogRef.close(false);

  }



  accept(): void {

    this.dialogRef.close(true);

  }

}
