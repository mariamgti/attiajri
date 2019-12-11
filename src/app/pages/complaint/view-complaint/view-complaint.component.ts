import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../models/Complaint';
import { ComplaintService } from '../../../services/complaint.service';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { Router, } from '@angular/router';
import { Data } from 'src/app/services/Data.service';
@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.scss']
  , animations: [
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
export class ViewComplaintComponent implements OnInit {
  complaint: Complaint;
  complaints: Complaint[];
  CommentDescrip: string;
  show: boolean = false;
  i: Number = 0;
  state: string;
  isHandled: boolean = false;
  isNotHandled: boolean = false;
  complRef: number;
  statut: boolean = false;
  bankResponse;
  selectedClaimValue;
  resultCode: any;
  Notdeleted: boolean = false;
  showFormError: boolean = false;
  deleted: boolean = false;
  affecte;
  currentUrl: string = "/viewComplaint"
  usefullInformation: [any, any]
  constructor(private complaintService: ComplaintService, private router: Router, private data: Data) { }

  ngOnInit() {
    this.loadComplaints();
  }

  // Issues list
  loadComplaints() {
    return this.complaintService.getComplaints(3).subscribe(data => {
      this.complaints = data;

    })
  }
  Descrip(complaint: Complaint) {
    this.i = +1;
    this.CommentDescrip = complaint.complDetails;
    this.complaint = complaint;
    this.complRef = complaint.complRef;
    this.state = complaint.state;

    if (complaint.state === 'non affecté') {

      this.isNotHandled = true;
    }
    else {

      this.isNotHandled = false;
    }
    if (complaint.state === "traité" && complaint.flgSupp != 1) {

      this.isHandled = true;
    }
    else {

      this.isHandled = false;
    }

    this.bankResponse = complaint.bankResponse;
    this.selectedClaimValue = complaint;
    if (complaint.state == "En cours de traitement")
      this.statut = true;
    if (this.show == false) {
      this.show = true;
    }
  }
  Delete(complaint: Complaint) {
    if (complaint.state != 'non affecté') {
      this.showFormError = true;
      this.affecte = true;

    } else {
      this.complaintService.deleteComplaint(this.complRef).subscribe((data: {}) => {

        this.resultCode = data;
        if (this.resultCode.resultCode != '0000') {
          this.showFormError = true;
          this.Notdeleted = true;
        }
        else
          this.showFormError = true;
        this.deleted = true;
        this.loadComplaints();

      })
    }


  }

  dismiss() {
    this.isNotHandled = false;
    this.isHandled = false;
    this.show = false;
  }


  onSurvey() {
    if (this.state === "traité" && this.complaint.flgSupp != 1) {
      this.data.storage = this.complaint;

      this.router.navigate(['/survey']);
    }
  }
  onUpdate() {
    this.router.navigateByUrl('/addComplaint', { state: this.complaint });



  }
}