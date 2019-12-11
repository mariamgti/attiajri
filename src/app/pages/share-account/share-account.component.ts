import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PortFeuille } from '../../models/PortFeuille';
import { FlowaccserviceService } from '../../services/flowaccservice.service';
import { ShareAccountService } from '../../services/share-account.service';
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
  shareAccountList: any = [];
  flowAccountList: any = [];
  shareWalletList: any = [];
  _show = false;
  _show1 = false;
  _show2 = false;
  selectedLevel;
  selectedLevel1;
  selectedWalletValue;
  shareAccount: boolean = false;
  constructor(public shareAccService: ShareAccountService, public flowAccService: FlowaccserviceService) { }

  ngOnInit() {
    this.loadFlowAccounts();

  }
  onSelect(PortFeuille: PortFeuille): void {
    this.selectedWalletValue = PortFeuille;
    if (!this._show2) { this._show2 = true; }

    else { this._show2 = false; }
 
  }

  Dismiss() {

    this._show2 = false;

  }
  selected() {

    this.loadShareAccounts(this.selectedLevel.numCpt);
    this._show = true;
    if (!this.shareAccount) { this.shareAccount = true; }
    else
      this.shareAccount = false;
  }
  selectedShareAcc() {
  
    this.loadWallets(this.selectedLevel1.shareAccNumber);
    this._show1 = true;
  }
  // list
  loadFlowAccounts() {
    return this.flowAccService.GetFlowAccount().subscribe((data: {}) => {
      this.flowAccountList = data;
    
    })
  }
  //  list
  loadShareAccounts(numCpt) {
    return this.flowAccService.GetShareAccount(numCpt).subscribe((data: {}) => {
      this.shareAccountList = data;
   
    })
  }
  loadWallets(shareAccNumber) {
    return this.flowAccService.GetWallets(shareAccNumber).subscribe((data: {}) => {
      this.shareWalletList = data;
     
    })
  }
}
