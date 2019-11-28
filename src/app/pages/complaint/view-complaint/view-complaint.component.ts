import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../models/complaint';
import { ComplaintService } from '../../../services/complaint.service';
import { transition, trigger, animate, style,state } from '@angular/animations';
import { DocumentHeader } from 'src/app/models/documentHeader';
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
  complaints:Complaint[];
  CommentDescrip:string;
  show:boolean=false;
  i:Number=0;
  complRef;
  statut:boolean=false;
  bankResponse;
  selectedClaimValue;
  resultCode:any;
  Notdeleted:boolean=false;
  showFormError:boolean=false;
  deleted:boolean=false;
  affecte;
  constructor(private complaintService: ComplaintService) { }

  ngOnInit() {
  this.loadComplaints();
  }

     // Issues list
     loadComplaints() {
      return this.complaintService.getComplaints(1).subscribe(data => {
        this.complaints = data;
        
        console.log(" those are the complaints"+   this.complaints[0].inputDate);
      })
    }
    Descrip(complaint:Complaint)
    {
     this.i =+1;
      this.CommentDescrip=complaint.complDetails;
      this.complRef=complaint.complRef;
      this.bankResponse=complaint.bankResponse;
      this.selectedClaimValue=complaint;
     if(complaint.state=="En cours de traitement")
     this.statut=true;
     if(this.show==false)
     {
       this.show=true;
     }
      console.log(" hi" + complaint.state);
    }
    Delete(complaint:Complaint)
    {
      if(complaint.state!='Non affecté')
      {
        this.showFormError=true;
        this.affecte=true;

      }else{
        console.log(" hi" + this.complRef);
        this.complaintService.deleteComplaint(this.complRef).subscribe((data: {})  => {
       
         this.resultCode=data;
         if(this.resultCode.resultCode!='0000')
         {
           this.showFormError=true;
         this.Notdeleted=true;
         }
         else
         this.showFormError=true;
         this.deleted=true;
         this.loadComplaints();
        
       })
      }
    

    }
    
    dismiss(){
      this.show=false;
    }
}