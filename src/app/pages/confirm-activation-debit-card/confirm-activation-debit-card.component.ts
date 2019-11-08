import { Component, OnInit, Input } from '@angular/core';


import { Router, ActivatedRoute } from '@angular/router';
import { ClientWsService } from '../../services/client-ws.service';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { ConfirmActivationService } from '../../services/confirm-activation.service';
import { CarteMxp } from 'src/app/models/CarteMxp';
import { CartesMxpWS } from 'src/app/services/cartes-Mxp-ws';
import { ResponseDocumentHeader } from '../../models/ResponseDocumentHeader';
import { Data } from 'src/app/services/Data.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-confirm-activation-debit-card',
  templateUrl: './confirm-activation-debit-card.component.html',
  styleUrls: ['./confirm-activation-debit-card.component.scss']
})
export class ConfirmActivationDebitCardComponent implements OnInit {
  @Input() carte: CarteMxp;
  nomClient: string;
  load: boolean;
  showRequiredPwd: boolean = false;
  showIncorrectPwd: boolean = false;
  password: string = '';
  value: string;
  confirmForm: FormGroup;
  errorMessage: string;
  isActivated: boolean;
  isDesactivated: boolean;
  age: any;
  ncp: any;
  numCarte: any;
  codeStatut: any;
  activationResult: ResponseDocumentHeader;
  resultCode: String;
  result: [any];
  previousUrl: any;
  isRefresh: boolean = false;
  currentUrl: string = "/confirm-activation-carte-debit"
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientWsService: ClientWsService, private data: Data,
    private formBuilder: FormBuilder, private confirmActivationService: ConfirmActivationService, private cartesMxpWS: CartesMxpWS,
    private location: Location) {
    this.router.getCurrentNavigation().extras.state
  }
  ngOnInit() {
    this.previousUrl = this.data.storage;
    console.log("previous url!!!!!");
    console.log(this.previousUrl)
    if (!this.previousUrl) {
      this.isRefresh = true
      console.log("refresh !!!")
      console.log(this.isRefresh)
    }
    new FormControl(this.password, Validators.required);
    this.carte = history.state;
    this.nomClient = this.carte.inti;
    if (this.carte.libStatut === 'Active') {
      this.isActivated = true;
    }
    if (this.carte.libStatut === 'Inactive') {
      this.isDesactivated = true;
    }
    this.age = this.carte.age;
    this.ncp = this.carte.ncp
    this.numCarte = this.carte.numCarte;
    this.codeStatut = this.carte.codeStatut;
    this.doShuffle1();
    this.doShuffle2();
    this.initForm();
  }
  initForm() {
    this.confirmForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  onSubmit() {
    this.password = this.confirmForm.get('password').value;
    if (this.confirmForm.invalid && this.confirmActivationService.checkEmptyPassword(this.password) === false) {
      this.showRequiredPwd = true;
    }
    if (this.confirmActivationService.checkPassword(this.password) === false) {
      this.load = false;
      this.showIncorrectPwd = true;
    }
    if (this.confirmForm.valid && this.confirmActivationService.checkPassword(this.password) === true) {
      this.load = true;
      console.log(this.carte.codeStatut);
      if (this.carte.codeStatut == 5) {
        this.cartesMxpWS.activerCarte(this.age, this.ncp, this.numCarte, 2).subscribe(data => {
          this.activationResult = data;
          console.log('result', this.activationResult)
          this.resultCode = this.activationResult.documentHeader.resultCode;
          this.data.storage = this.currentUrl,
            this.router.navigateByUrl('/resultActivation', {
              state: this.carte
            });
          this.load = false;
        });
      }
      if (this.carte.codeStatut == 2) {
        this.cartesMxpWS.desactiverCarte(this.age, this.ncp, this.numCarte, 2).subscribe(data => {
          this.activationResult = data;
          //  if (this.activationResult.documentHeader.resultCode === "0000") 
          this.data.storage = this.activationResult.documentHeader.resultCode,
            this.load = false;
          this.router.navigateByUrl('/resultActivation', { state: this.carte });
        });
      }
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
    this.router.navigateByUrl('/listeCartesDébit');
  }
}
