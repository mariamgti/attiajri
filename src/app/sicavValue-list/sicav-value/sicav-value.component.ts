import { Component, OnInit } from '@angular/core';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { SicavValueService } from '../../services/sicav-value.service';
import { Router } from '@angular/router';
import { SicavValue } from '../../models/sicavValue';

@Component({
  selector: 'app-sicav-value',
  templateUrl: './sicav-value.component.html',
  styleUrls: ['./sicav-value.component.scss']
})
export class SicavValueComponent implements OnInit {

  sicavValues: SicavValue[];
  constructor( 
    private sicavValueService: SicavValueService, private router: Router) {
  }

  ngOnInit() {
    this.sicavValueService.getSicavValues().subscribe(data => {
      this.sicavValues = data;
      console.log(this.sicavValues[0].mutualFund);
    });
  }

}
