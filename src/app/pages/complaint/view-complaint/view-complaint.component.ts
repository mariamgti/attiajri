import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../models/complaint';
import { ComplaintService } from '../../../services/complaint.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.scss']
})
export class ViewComplaintComponent implements OnInit {
  addedComplaint: Complaint;
  complaints: Complaint[];

  cols: any[];
  constructor(private complaintService: ComplaintService) { }

  ngOnInit() {
  /*  this.complaintService.addComplaint(1,
      ' the complDetails',


      formatDate(new Date(), 'yyyy/MM/dd', 'en'),

      '3',
      'login',
      'phone',
      'home Address',
      'city',
      'post code',
      '2',
      'autre_prof',
      'flg_supp',
      formatDate(new Date(), 'yyyy/MM/dd', 'en')





    ).subscribe(data => {
      this.addedComplaint = data;
      console.log(this.addedComplaint);
    });*/
    this.complaintService.getComplaints(1).subscribe(data => {

      this.complaints = data
    });

    this.cols = [
      { field: 'Référence réclamation', header: 'Référence réclamation' },
      { field: 'Date réclamation<', header: 'Date réclamation<' },
      { field: 'Etat', header: 'Etat' },
      { field: 'Date traitement réclamation', header: 'Date traitement réclamation' },
      { field: 'Options', header: 'Options' },


    ];
  }
}