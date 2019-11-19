import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../models/complaint';
import { ComplaintService } from '../../../services/complaint.service';
import { FiabilisationService } from '../../../services/fiabilisation.service';
import { ShareAccountService } from '../../../services/share-account.service';
import { Question } from '../../../models/question';
import { formatDate } from '@angular/common';
import { ShareAccount } from '../../../models/shareAccount';
import { PortFeuille } from '../../../models/portFeuille';
import { ComplaintDoc } from '../../../models/complaintDoc';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {
  addedComplaint: Complaint;
  updatedComplaint: Complaint;
  complaints: Complaint[];
  survey: Question[];
  contactInfo: object[];
  updatedContactInfo:object[][];
  shareAcc: ShareAccount[];
  porteFeuille: PortFeuille[];
  complaintDocs : ComplaintDoc[];
  constructor( 
    private complaintService: ComplaintService,  private fiabilisationService: FiabilisationService,
    private shareAccountService: ShareAccountService, ) {
  }

  ngOnInit() {
    this.complaintService.getComplaints(1).subscribe(data => {
      this.complaints = data;
      console.log(this.complaints);
    });

    this.complaintService.addComplaint(1, 'updating the details', formatDate(new Date(), 'yyyy/MM/dd', 'en'), formatDate(new Date(), 'yyyy/MM/dd', 'en'), 'handled', 'accepted').subscribe(data => {
      this.addedComplaint = data;
      console.log(this.addedComplaint);
    });


    this.complaintService.deleteComplaint(3).subscribe(data => {
    
    });

 

  this.complaintService.getSurvey().subscribe(data => {
    this.survey=data;
    console.log(this.survey);
    
  });
  this.complaintService.updateComplaint(28, 'this is the deatail','15/02/2019',  '13/06/2019', 'handled', 'accepted').subscribe(data => {
    this.updatedComplaint=data;
    console.log('updating complaint');
    console.log(this.updatedComplaint);
    
  });
this.fiabilisationService.getContactInfo(1).subscribe(data =>{
this.contactInfo=data[1];
console.log('this is contact information')
console.log(this.contactInfo);

});

this.fiabilisationService.updateContactInfo(1, 'new mail', 78933441, 'Allemagne', 6130, 'MUNIQUE').subscribe(data=>{
 this.updatedContactInfo=data;
 console.log('updating contact information...')
 console.log(this.updatedContactInfo);
  

});

this.shareAccountService.getShareAccounts(1).subscribe(data =>{

this.shareAcc= data;

})
this.shareAccountService.getPortFeuilles(1234567).subscribe(data =>{

  this.porteFeuille=data;
})

this.complaintService.getComplaintDocs(23).subscribe(data =>{

  this.complaintDocs= data;
})
  }



  

}
