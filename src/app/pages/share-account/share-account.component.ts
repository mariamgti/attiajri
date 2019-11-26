import { Component, OnInit,Input } from '@angular/core';
import { ShareAccountService } from '../../services/share-account.service';
import{FlowaccserviceService} from '../../services/flowaccservice.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {PortFeuille} from '../../models/portFeuille';
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
  _show = false;
  _show1=false;
  _show2=false;
  selectedLevel;
  selectedLevel1;
  selectedWalletValue;
  shareAccount:boolean=false;
  constructor(public shareAccService: ShareAccountService,public flowAccService:FlowaccserviceService) { }

  ngOnInit() {
    this.loadFlowAccounts();
   
  }
  onSelect(PortFeuille: PortFeuille): void {
    this.selectedWalletValue = PortFeuille;
  if(!this._show2)
  {this._show2=true;}
  
  else 
  {this._show2=false;}
  
    console.log(this._show2);
  } 
  
  Dismiss() {
   
    this._show2 = false;
  
}
  selected(){
    console.log(this.selectedLevel.numCpt);
    this.loadShareAccounts(this.selectedLevel.numCpt);
    this._show=true;
    if(!this.shareAccount)
   { this.shareAccount=true;}
   else
   this.shareAccount=false;
  } 
  selectedShareAcc()
  {
    console.log(this.selectedLevel1.shareAccNumber);
    this.loadWallets(this.selectedLevel1.shareAccNumber);
    this._show1=true;
  } 
   // list
   loadFlowAccounts() {
    return this.flowAccService.GetFlowAccount().subscribe((data: {}) => {
      this.FlowAccountList = data;
      console.log(" those are the accounts"+data);
    })
  }
   //  list
   loadShareAccounts(numCpt) {
    return this.flowAccService.GetShareAccount(numCpt).subscribe((data: {}) => {
      this.ShareAccountList = data;
      console.log(" those are the accounts"+ data);
    })
  }
  loadWallets(shareAccNumber) {
    return this.flowAccService.GetWallets(shareAccNumber).subscribe((data: {}) => {
      this.ShareWalletList = data;
      console.log(" those are the accounts"+ data);
    })
  }
}
