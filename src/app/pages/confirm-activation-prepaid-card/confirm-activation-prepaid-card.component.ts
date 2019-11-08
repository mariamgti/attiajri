import { Component, OnInit, Input } from '@angular/core';
import { PrepaidCardModel } from 'src/app/models/prepaid.card.model';

import { Router, ActivatedRoute } from '@angular/router';
import { ClientWsService } from '../../services/client-ws.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ConfirmActivationService } from '../../services/confirm-activation.service';
import { DebitCardModel } from '../../models/debit.card.model';


@Component({
  selector: 'app-confirm-activation-prepaid-card',
  templateUrl: './confirm-activation-prepaid-card.component.html',
  styleUrls: ['./confirm-activation-prepaid-card.component.scss']
})
export class ConfirmActivationPrepaidCardComponent implements OnInit {
  @Input() carte: PrepaidCardModel;


  clients: any
  load: boolean;
  showRequiredPwd: boolean = false;
  showIncorrectPwd: boolean = false;
  password: string = '';
  value: string;
  confirmForm: FormGroup;
  errorMessage: string;
  isActivated: boolean;
  isDesactivated: boolean;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientWsService: ClientWsService, private formBuilder: FormBuilder,
    private confirmActivationService: ConfirmActivationService, ) {
    this.router.getCurrentNavigation().extras.state
  }
  ngOnInit() {
    new FormControl(this.password, Validators.required);
    this.clientWsService.findClientByCodeClient(1).subscribe((data: {}) => {
      this.clients = data;
    });
    this.carte = history.state;
    if (this.carte.statut === 'A') {
      this.isActivated = true;
    }
    if (this.carte.statut === 'I') {
      this.isDesactivated = true;
    }
    this.doShuffle1();
    this.doShuffle2();
    this.initForm();
  }
  initForm() {

    this.confirmForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(9)]],
    });
  }
  onSubmit() {
    this.password = this.confirmForm.get('password').value;
    if (this.confirmForm.invalid && this.confirmActivationService.checkEmptyPassword(this.password) === true) {
      this.showRequiredPwd = true;
    }
    if (this.confirmForm.invalid && this.confirmActivationService.checkPassword(this.password) === true) {
      this.showIncorrectPwd = true;
    }
    if (this.confirmForm.valid) {
      this.load = true;
      setTimeout(() => {
        if (this.carte.statut === 'I') {
          this.clientWsService.activerCarteP(this.carte.numCarteP).subscribe((data: {}) => {
          });
          this.router.navigateByUrl('/succesActivation', { state: this.carte });
        }
        if (this.carte.statut === 'A') {
          this.clientWsService.desactiverCarteP(this.carte.numCarteP).subscribe((data: {}) => {
          });
          this.router.navigateByUrl('/succesActivation', { state: this.carte });
        }
        this.load = false;
      }, 3000);
    }
  }
  item: string;
  tableauChiffres1 = [

    { item: '0' },
    { item: '1' },

    { item: '2' },

    { item: '3' },

    { item: '4' },
  ];
  tableauChiffres2 = [
    { item: '5' },

    { item: '6' },

    { item: '7' },

    { item: '8' },

    { item: '9' },
  ];
  doShuffle1() {
    this.shuffleArray(this.tableauChiffres1);
  }
  doShuffle2() {
    this.shuffleArray(this.tableauChiffres2);
  }
  onchange(value) {
    this.password = this.password.concat(value);
  }
  // -> Fisher–Yates shuffle algorithm
  shuffleArray = function (array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  rem() {
    this.password = '';
  }
  annulerActivation() {
    this.router.navigateByUrl('/listeCartesPrépayées');
  }
}
