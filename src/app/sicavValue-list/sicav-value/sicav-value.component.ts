import { Component, OnInit } from '@angular/core';
import { SicavValueService } from '../../services/sicav-value.service';
import { SicavValue } from '../../models/SicavValue';

@Component({
  selector: 'app-sicav-value',
  templateUrl: './sicav-value.component.html',
  styleUrls: ['./sicav-value.component.scss']
})
export class SicavValueComponent implements OnInit {
  today= new Date();
  sicavValues: SicavValue[];
  VLveille:number;
  VLjour:number;
  constructor( 
    private sicavValueService: SicavValueService) {
  }

  ngOnInit() {
    this.sicavValueService.getSicavValues().subscribe(data => {
      this.sicavValues = data;
      
    });
  }
  

}
