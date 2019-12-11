import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SicavValue } from '../../models/SicavValue';
import { SicavValueService } from '../../services/sicav-value.service';

@Component({
  selector: 'app-sicav-value',
  templateUrl: './sicav-value.component.html',
  styleUrls: ['./sicav-value.component.scss']
})
export class SicavValueComponent implements OnInit {
  todayISOString: string = new Date().toISOString();
  sicavValues: SicavValue[];
  constructor(
    private sicavValueService: SicavValueService, private router: Router) {
  }

  ngOnInit() {
    this.sicavValueService.getSicavValues().subscribe(data => {
      this.sicavValues = data;
    
    });
  }

}
