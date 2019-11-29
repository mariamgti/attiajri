import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services/complaint.service';
import { Question } from 'src/app/models/question';
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
  response: Response[];
  shownGroup: any;
  group: Question;
  list: object[] ;
  constructor(private complaintService: ComplaintService, ) { }

  ngOnInit() {


    this.complaintService.getSurvey().subscribe(data => {
      this.survey = data;
      //  console.log(this.survey);

    });
  }

  onRateChange = (score) => {
    this.score = score;
  }
  public mark = (index, s) => {
    this.group = s;
    console.log(index)
    console.log(this.group.question)
    console.log(this.score)
    console.log("******************")
  //  for (let i = 0; i < index; i++) {


      this.list = [


      //  [this.list]
         
          { 'index': index },
          { 'questRef': this.group.question },
          { 'score': this.score }
        
      ]

  //  }

    console.log(this.list)

  }


}
