import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PortFeuille } from '../../models/PortFeuille';
import { FlowaccserviceService } from '../../services/flowaccservice.service';
import { ShareAccountService } from '../../services/share-account.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
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
   ShareAccountList: any = [];
   FlowAccountList: any = [];
  ShareWalletList: any = [];
  _showPortefeuilles=false;
  _showDetailsPF=false;
  selectedLevel;
  selectedLevel1;
  selectedWalletValue;
 
  constructor(public shareAccService: ShareAccountService,public flowAccService:FlowaccserviceService) { }

  ngOnInit() {
    this.loadFlowAccounts();

  }
  //permet de faire apparaitre ou disparaitre le detail de la portefeuille
  onSelectWallet(PortFeuille: PortFeuille): void {
    this.selectedWalletValue = PortFeuille;
  if(!this._showDetailsPF)
  {this._showDetailsPF=true;}
  
  else 
  {this._showDetailsPF=false;}
  
    
  } 
  

  selectedFlowAccount(){
 
    this.loadShareAccounts(this.selectedLevel.numCpt);
    this._showPortefeuilles=false;
  
  } 
  // le compte titre selectionné
  selectedShareAcc()
  {
   
    this.loadWallets(this.selectedLevel1.shareAccNumber);
    this._showPortefeuilles=true;
  } 
   // list des comptes debits
   loadFlowAccounts() {
    return this.flowAccService.GetFlowAccount().subscribe((data: {}) => {
      this.FlowAccountList = data;
      
    })
  }
   //  list des comptes titres
   loadShareAccounts(numCpt) {
    return this.flowAccService.GetShareAccount(numCpt).subscribe((data: {}) => {
      this.ShareAccountList = data;
    
    })
  }
  //  list des portefeuilles
  loadWallets(shareAccNumber) {
    return this.flowAccService.GetWallets(shareAccNumber).subscribe((data: {}) => {
      this.ShareWalletList = data;
     
    })
  }
}
