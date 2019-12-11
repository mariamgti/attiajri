import { Component, OnInit, Input } from '@angular/core';
import { ShareAccountService } from '../../services/share-account.service';
import { FlowaccserviceService } from '../../services/flowaccservice.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { PortFeuille } from '../../models/portFeuille';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ShareAccount } from 'src/app/models/shareAccount';
import { AccountModel } from 'src/app/models/AccountModel';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-share-account',
  templateUrl: './share-account.component.html',
  styleUrls: ['./share-account.component.scss'], animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class ShareAccountComponent implements OnInit {
  ShareAccountList: ShareAccount[] = [];
  FlowAccountList: any = [];
  ShareWalletList: ShareAccount[];
  _showPortefeuilles = false;
  _showDetailsPF = false;
  selectedFlowAcc:AccountModel;
  selectedShareAc :ShareAccount;
  selectedWalletValue;
  load: boolean = true;
  showSelectShare: boolean = false;
  pasComp: string = "Pas de comptes titres associés au compte espéce sélectionné.";
  constructor(public shareAccService: ShareAccountService, public flowAccService: FlowaccserviceService) { }

  ngOnInit() {


    this.loadFlowAccounts();

  }
  //permet de faire apparaitre ou disparaitre le detail de la portefeuille
  onSelectWallet(PortFeuille: PortFeuille): void {
    this.selectedWalletValue = PortFeuille;
    if (!this._showDetailsPF) { this._showDetailsPF = true; }

    else { this._showDetailsPF = false; }

  }

  selectedFlowAccount() {
    this.load = true;
    this._showPortefeuilles = false;
    this.showSelectShare = false;
    this.ShareAccountList = [];
    this.loadShareAccounts(this.selectedFlowAcc.numCpt);
  }
  // le compte titre selectionné
  selectedShareAcc() {
    this.load = true;
    this.loadWallets(this.selectedShareAc.shareAccNumber);
    this._showPortefeuilles = true;

  }
  // list des comptes debits
  loadFlowAccounts() {
    return this.flowAccService.GetFlowAccount().subscribe((data: {}) => {
      this.FlowAccountList = data;
      this.load = false;
    })
  }
  //  list des comptes titres
  loadShareAccounts(numCpt) {
    return this.flowAccService.GetShareAccount(numCpt).subscribe(data => {

      this.ShareAccountList = data;
      this.load = false;

    })
  }
  //  list des portefeuilles
  loadWallets(shareAccNumber) {
    return this.flowAccService.GetWallets(shareAccNumber).subscribe(data => {
      this.ShareWalletList = data;
      this.load = false;
      console.log("" + this.ShareAccountList.length)
    })
  }
}
