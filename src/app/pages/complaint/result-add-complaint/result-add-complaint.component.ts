import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/services/Data.service';

@Component({
  selector: 'app-result-add-complaint',
  templateUrl: './result-add-complaint.component.html',
  styleUrls: ['./result-add-complaint.component.scss']
})
export class ResultAddComplaintComponent implements OnInit {
  isSuccess: boolean;
  constructor(private data: Data) { }

  ngOnInit() {

    this.isSuccess = this.data.storage;
  }

}
