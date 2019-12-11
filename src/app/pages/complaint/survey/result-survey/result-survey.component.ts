import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/services/Data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-survey',
  templateUrl: './result-survey.component.html',
  styleUrls: ['./result-survey.component.scss']
})
export class ResultSurveyComponent implements OnInit {

  isSuccess: boolean;
  constructor(private data: Data, private router: Router) { }

  ngOnInit() {

    this.isSuccess = this.data.storage;
  }
  onRetour() {

    this.router.navigate(['/viewComplaint'])
  }


}
