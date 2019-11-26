import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { ComplaintObject } from 'src/app/models/complaintObject';
import { Data } from 'src/app/services/Data.service';
import { ClientModel } from '../../../models/client.model';
import { formatDate } from '@angular/common';
import { ComplaintDoc } from '../../../models/complaintDoc';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-complaint-step2',
  templateUrl: './add-complaint-step2.component.html',
  styleUrls: ['./add-complaint-step2.component.scss']
})
export class AddComplaintStep2Component implements OnInit {
  fileContent: any ;
  reader = new FileReader();
  invalidIncedentDate: boolean = false;
  invalidDescription: boolean = false;
  invalidComplaintObject: boolean = false;
  invalidComplaintDoc: boolean = false;
  showFormError: boolean = false;
  clientInformation: [any, any, any, any, any, any];
  complaintDocuments: ComplaintDoc[];
  client: ClientModel;
  complaintForm: FormGroup;
  complaintObejcts: ComplaintObject[] ;
  file:File

  constructor(private formBuilder: FormBuilder, private clientWsService: ClientWsService, private http: HttpClient, private data: Data,
    private complaintService: ComplaintService,
    private router: Router) { }
  ngOnInit() {
    this.clientInformation = this.data.storage;
    console.log("clientInformation", this.clientInformation);
    this.initForm();
    this.complaintService.getAllcomplaintObjects().subscribe(data => {

      this.complaintObejcts = data;
    });
    this.clientWsService.findClientByCodeClient(this.clientInformation[1].codCli).subscribe(data => {
      this.client = data;
     
    });
  }

  initForm() {
    this.complaintForm = this.formBuilder.group({
      incedentDate: ['', Validators.required],
      description: ['', Validators.required],
      complaintObject: ['', Validators.required],
      complaintDoc: [''],
    });
  }

  handleFileInput($event) {
     this.file = $event.target.files[0];
    console.log('size', this.file.size);
    console.log('type', this.file.type);

    if ((this.file.type === 'application/pdf' || 'image/*') && (this.file.size <= 9000000)) {
      console.log('this is a pdf file very good !!!!!!!!!!!');

       
      this.reader.readAsArrayBuffer(this.file);
      this.reader.onloadend = () => {
        this.fileContent = Array.from(new Uint8Array(<ArrayBuffer>this.reader.result));
        //this.complaintDocuments.fileContent = fileContent;
       // this.complaintDocuments.fileName = file.name;
        alert(Array.from(new Uint8Array(<ArrayBuffer>this.reader.result)));
      };
      //  console.log( "file!!!!!!!!!!!!!!!!!!!!!!!");
      //  console.log('file :', file);
      // console.log(Array.from(new Uint8Array(<ArrayBuffer>reader.result)));
    } else {
      console.log('this is not a a valid file');
    }
  }
  onClick(element) {
    const fileUpload = document.getElementById(element) as HTMLInputElement;
    fileUpload.click();
  }
  onSubmitForm() {
    if (this.complaintForm.valid) {
      this.complaintDocuments=[
        {id_doc: null,fileName: this.file.name,fileContent:this.fileContent},
      
         {id_doc: null,fileName: this.file.name,fileContent:this.fileContent}
      ]
      console.log(this.complaintDocuments)
    const formValue = this.complaintForm.value;
    console.log(formValue)
   
    
     console.log("heeerrrreeeeeeee")
      //console.log(this.clientInformation[1].codCli)
      this.complaintService.addComplaint(
        this.client.codCli,
        this.complaintForm.get('description').value,
        formatDate(new Date(), 'yyyy/MM/dd', 'en'),
        this.complaintForm.get('complaintObject').value,
        "login",
        this.clientInformation[3],
        this.client.homeAddress,
        this.client.city,
        this.client.postCode,
        this.clientInformation[3],
        this.clientInformation[5],
        "1",
        formatDate(this.complaintForm.get('incedentDate').value, 'yyyy/MM/dd', 'en'),
        this.complaintDocuments
        ).subscribe(data => {
          console.log('resulllllt !!!!!!!!!!!!!!!!!!!!!!!')
          console.log(data)
        })
    }
    else {
      if (this.complaintForm.get('incedentDate').invalid) {
        this.showFormError = true;
        this.invalidIncedentDate = true;
      }
      if (this.complaintForm.get('description').invalid) {
        this.showFormError = true;
        this.invalidDescription = true;
      }

      if (this.complaintForm.get('complaintObject').invalid) {
        this.showFormError = true;
        this.invalidComplaintObject = true;
      }

  /*    if (this.complaintForm.get('complaintDoc').invalid) {
        this.showFormError = true;
        this.invalidComplaintDoc = true;
      }*/


    }

  }
  cancel() {
    this.router.navigate(['/addComplaint']);
  }

}
