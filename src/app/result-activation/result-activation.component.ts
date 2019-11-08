import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { CarteMxp } from 'src/app/models/CarteMxp';
import { Data } from '../services/Data.service';


@Component({
  selector: 'app-result-activation',
  templateUrl: './result-activation.component.html',
  styleUrls: ['./result-activation.component.scss']
})
export class ResultActivationComponent implements OnInit {
  carte: CarteMxp;
  resultCode: string;
  nomClient: string;
  isFailedActivation: boolean;
  isFailedDisactivation: boolean;
  isActivated: boolean;
  isDesactivated: boolean;
  previousUrl: any;
  isRefresh: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientWsService: ClientWsService, private data: Data) {
    this.router.getCurrentNavigation().extras.state;
    this.resultCode = this.data.storage;
    console.log(this.resultCode);
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
    this.carte = history.state;
    this.nomClient = this.carte.inti;
    if (this.carte.libStatut == 'Active' && this.resultCode === '0000') {
      this.isActivated = true;
    }

    if (this.carte.libStatut == 'Inactive' && this.resultCode === '0000') {
      this.isDesactivated = true;
    }
    if (this.carte.libStatut == 'Active' && this.resultCode != '0000') {
      this.isFailedDisactivation = true;
    }
    if (this.carte.libStatut == 'Inactive' && this.resultCode != '0000') {
      this.isFailedActivation = true;
    }
  }
  getColor() {
    if (this.resultCode === '0000') {
      return 'green';
    } else {
      return 'red';
    }
  }
}