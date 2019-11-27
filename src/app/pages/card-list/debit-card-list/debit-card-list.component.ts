import { Component, OnInit, Input } from '@angular/core';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { AccountModel } from '../../../models/account.model';
import { AttijariBankApiWsService } from '../../../services/attijari-bank-api-ws.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AuthService } from '../../../services/auth.service';
import { CartesMxpWS } from 'src/app/services/cartes-Mxp-ws';
import { ListCartesMxp } from '../../../models/listCartesMxp';
import { DocumentHeader } from '../../../models/documentHeader';
import { CarteMxp } from 'src/app/models/CarteMxp';
@Component({
  selector: 'app-debit-card-list',
  templateUrl: './debit-card-list.component.html',
  styleUrls: ['./debit-card-list.component.scss']
})
export class DebitCardListComponent implements OnInit {
  load: boolean;
  //allAccountsApiBank: Account[];
  ncp: number;
  age: number;
  languageApiBank: string;
  accountsApiBank: Account[];
  loginsApiBank: string;
  CustomerCodesApiBank: string;
  accounts: any;
  shownGroup: any;
  clients: any;
  cards: any;
  cardNumber: number;
  selectedAccount: AccountModel;
  defaultSelect: string = "Select un compte :";
  state: any;
  uuid: any;
  listCartesMxp: ListCartesMxp;
  cartesMxp: CarteMxp[];
  infoCartesMxp: ListCartesMxp;
  opposerCarteRes: DocumentHeader;
  desactiverCarteRes: DocumentHeader;
  intitulCarte: string;

  constructor(private authService: AuthService, private clientWsService: ClientWsService, private cartesMxpWS: CartesMxpWS,
    private attijariBankApiWsService: AttijariBankApiWsService, private router: Router) {
  }
  ngOnInit() {
    this.authService.checkCredentials();
    this.uuid = Cookie.get('uuid');
    this.attijariBankApiWsService.getAccounts(this.uuid).subscribe(data => {
      this.accountsApiBank = data;
    });
    this.attijariBankApiWsService.getLanguage(this.uuid).subscribe(data => {
      this.languageApiBank = data;

    });
    this.attijariBankApiWsService.getLogins(this.uuid).subscribe(data => {
      this.loginsApiBank = data;

    });
    this.attijariBankApiWsService.getCustomerCodes(this.uuid).subscribe(data => {
      this.CustomerCodesApiBank = data;

    });

    this.clientWsService.findClientByCodeClient(1).subscribe((data: {}) => {

      this.clients = data;

    });
    this.clientWsService.findCompteByCodeClient(1).subscribe((data: {}) => {

      this.accounts = data;

      window.dispatchEvent(new CustomEvent('init-select'));

    });

    this.clientWsService.findCarteDebitBynumCpt(1).subscribe((data: {}) => {
      this.cards = data;

    });

    this.cartesMxpWS.getInfoCartesByCompte('00201', '4040918858').subscribe(data => {

      this.listCartesMxp = data;
      this.intitulCarte = this.listCartesMxp.listCartesMxp[0].inti;
      this.ncp = this.listCartesMxp.listCartesMxp[0].ncp;
      this.age = this.listCartesMxp.listCartesMxp[0].age;

      console.log(this.listCartesMxp.listCartesMxp)
      this.cartesMxp = this.listCartesMxp.listCartesMxp;
    });
  }

  getSelectedAccount() {
    this.clientWsService.findCarteDebitBynumCpt(this.selectedAccount.numCpt).subscribe((data: {}) => {
      this.cards = data;
    });
  }
  toggleGroup(group) {
    this.load = true;
   
      if (this.isGroupShown(group)) {
        this.shownGroup = null;
      } else {
        this.shownGroup = group;
      }
     
      this.load = false;
   
  }
  isGroupShown(group) {
    return this.shownGroup === group;
  };

}



