import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Question } from 'src/app/models/question';
import { Response } from 'src/app/models/Response';
import { Data } from 'src/app/services/Data.service';
import { Router } from '@angular/router';
import { DocumentHeader } from '../../../models/DocumentHeader';
import { Complaint } from '../../../models/Complaint';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  score: number = 0;
  toggledScore: any;
  displayRatingScore = 4;
  survey: Question[];
  response: Map<string, number>[] = [];
  map = new Map();
  shownGroup: any;
  group: Question;
  list: object[];
  isQuesRef: boolean;
  complRef: number;
  complaint: Complaint;
  listResponse: Response[] = [];
  scores: Number[] = []
  result: DocumentHeader;
  isSuccess: boolean;
  invalidResponse: boolean = false;
  show: boolean = false;

  constructor(private complaintService: ComplaintService, private data: Data, private router: Router) {


  }


  ngOnInit() {

    this.complaint = this.data.storage
    this.complRef = this.complaint.complRef
    this.complaintService.getSurvey().subscribe(data => {
      this.survey = data;
      this.survey.forEach(e => {
        let responseItem = new Response();
        responseItem.question = e;
        responseItem.complaintRef = this.complRef;
        responseItem.response = 0;
        this.listResponse.push(responseItem)

      })
    
    });
  }
  onRateChange = (score, index) => {
    this.listResponse[index].response = score;
  }


  valider() {

   
    const notAnsweredQues = this.listResponse.filter(item => item.response === 0);
   

    if (notAnsweredQues.length > 0) {

      this.show = true;
      this.invalidResponse = true;
    
    } else {



      this.complaintService.addSurveyResponse(this.listResponse).subscribe(data => {
        this.result = data;

        if (this.result.resultCode == "0000") {

          this.isSuccess = this.result.resultCode == "0000"
          this.data.storage = this.isSuccess,

            this.router.navigateByUrl('/resultSurvey')
        }

      });
    }

  }

}





