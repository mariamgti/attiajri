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
  show_details:boolean=false;
  warning:string;
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
      return this.complaintService.getComplaints(1).subscribe(data => {
        this.complaints = data;
        
      })
    }
    Descrip(complaint:Complaint)
    {
   
      this.CommentDescrip=complaint.complDetails;
      this.complRef=complaint.complRef;
      this.bankResponse=complaint.bankResponse;
      this.selectedClaimValue=complaint;

     if(this.show_details==false)
     {
       this.show_details=true;
     }else
     this.show_details=false;
     
    }
    Delete(complaint:Complaint)
    {
      if(complaint.state!='Non affecté')
      {
        this.showFormError=true;
        this.affecte=true;
        this.warning="Attention"

      }else{
        this.complaintService.deleteComplaint(this.complRef).subscribe((data: {})  => {
       
         this.resultCode=data;
         if(this.resultCode.resultCode!='0000')
         {
           this.showFormError=true;
         this.Notdeleted=true;
         this.warning="Attention"
         
         }
         else
         this.showFormError=true;
         this.deleted=true;
         this.warning="Attention"
         this.loadComplaints();
        
       })
      }
    

      this.isHandled = false;
    }
    
    
}