import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplaintService } from '../../../services/complaint.service';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/ClientModel';
import { ClientWsService } from '../../../services/client-ws.service';
import { Profession } from '../../../models/Profession';
import { Data } from 'src/app/services/Data.service';
import { CustomValidationService } from 'src/app/services/customValidationService';
import { Complaint } from 'src/app/models/Complaint';
import { AccountModel } from '../../../models/AccountModel';
import { ComplaintInput } from '../../../models/ComplaintInput';
import { ComplaintDoc } from '../../../models/ComplaintDoc';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent/* implements OnInit */ {
  invalidProfession: boolean = false;
  invalidMail: boolean = false;
  invalidPhone: boolean = false;
  invalidAccount: boolean = false;
  invalidClient: boolean = false;
  invalidOtherProfession: boolean = false;
  showFormError: boolean = false;
  complaintForm: FormGroup;

  listProfession: Profession[];
  listClientRatt: ClientModel[];
  listCompteRatt: AccountModel[];
  listComplaintDoc: ComplaintDoc[];

  isOtherProfess = false;


  selectedComplaint: Complaint;
  complaintInput: ComplaintInput;


  account: AccountModel;
  constructor(private formBuilder: FormBuilder, private clientWsService: ClientWsService, private data: Data, private customValidationService: CustomValidationService,
    private complaintService: ComplaintService, private router: Router) {
    this.router.getCurrentNavigation().extras.state;
  }
  ngOnInit() {

    this.complaintInput = new ComplaintInput();
    this.complaintInput.client = new ClientModel();
    this.complaintInput.complaint = new Complaint();

    this.selectedComplaint = history.state;
    this.complaintService.getProfessions().subscribe(data => {
      this.listProfession = data;
    })
    /*find client rattache by login*/
    this.clientWsService.findClientRattByLogin('1').subscribe(data => {
      this.listClientRatt = data;

      if (this.selectedComplaint.complRef) {
console.log(this.selectedComplaint.autre_prof)
        this.complaintInput.client = this.listClientRatt.filter(e => e.codCli == this.selectedComplaint.client.codCli)[0];

        this.complaintInput.phone = this.selectedComplaint.client.phone;
        this.complaintInput.email = this.selectedComplaint.client.email;
        this.complaintInput.codeProf = this.selectedComplaint.client.proffession.code;
        this.complaintInput.incedentDate = this.selectedComplaint.incedentDate
        this.complaintInput.isUpdate = true;
        this.complaintInput.complRef = this.selectedComplaint.complRef;
        this.complaintInput.complaint = this.selectedComplaint;
        this.complaintInput.objectCode = this.selectedComplaint.complaintObject.objectCode;
        this.complaintInput.complDetails = this.selectedComplaint.complDetails
        this.complaintInput.flgSupp = this.selectedComplaint.flgSupp;
        this.complaintInput.login = this.selectedComplaint.login;
        this.complaintInput.numCpt = this.selectedComplaint.account.numCpt;
        //this.complaintInput.autreProf = this.selectedComplaint.autreProf;



        this.complaintService.getComplaintDocs(this.complaintInput.complRef).subscribe(data => {
          this.listComplaintDoc = data;

          for (var i = 0; i < this.listComplaintDoc.length; i++) {
            var fileContent = [];
            var blob = new Blob([this.listComplaintDoc[i].fileContent as BlobPart], { type: this.listComplaintDoc[i].type });
            fileContent.push(blob);
            this.complaintInput.files.push(new File(fileContent, this.listComplaintDoc[i].fileName, {
              type: this.listComplaintDoc[i].type,
            }))
          }
        });



        if (this.complaintInput.codeProf == 3) {
          this.isOtherProfess = true;
          this.complaintForm.controls['other'].enable();
        } else {
          this.complaintForm.controls['other'].disable();
        }

        this.clientWsService.findCompteByCodeClient(this.complaintInput.client.codCli).subscribe(data => {
          this.listCompteRatt = data;
        });


      }

      else {

        this.clientWsService.findClientByCodeClient(3).subscribe(data => {

          this.complaintInput.client = this.listClientRatt.filter(e => e.codCli == data.codCli)[0];

          this.complaintInput.phone = this.complaintInput.client.phone;
          this.complaintInput.email = this.complaintInput.client.email;
          this.complaintInput.codeProf = this.complaintInput.client.proffession.code;
          this.complaintInput.incedentDate = null;
          this.complaintInput.isUpdate = false;
          this.complaintInput.flgSupp = 1;
          this.complaintInput.login = "my new login"
          this.complaintInput.numCpt = '';
          this.complaintInput.autreProf = this.complaintInput.client.autre_prof

          if (this.complaintInput.codeProf == 3) {
            this.isOtherProfess = true;
            this.complaintForm.controls['other'].enable();
          } else {
            this.complaintForm.controls['other'].disable();
          }

          this.clientWsService.findCompteByCodeClient(this.complaintInput.client.codCli).subscribe(data => {
            this.listCompteRatt = data;
          });

        });
      }



    }

    );
    this.initForm();
  }

  initForm() {
    this.complaintForm = this.formBuilder.group({
      client: ['', Validators.required],
      account: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, this.customValidationService.checkLimit(11111111, 99999999)]],
      profession: ['', Validators.required],
      other: ['', Validators.required]
    });
  }

  onSelectClient() {

    this.complaintInput.complaint.client = this.complaintInput.client
    this.complaintInput.email = this.complaintInput.client.email;
    this.complaintInput.phone = this.complaintInput.client.phone;
    this.complaintInput.codeProf = this.complaintInput.client.proffession.code;
    this.complaintInput.autreProf = '';

    this.onSelectProfession();

    /* chargement des comptes rattaches par client*/
    this.clientWsService.findCompteByCodeClient(this.complaintInput.client.codCli).subscribe(data => {
      this.listCompteRatt = data;
    });

  }

  onSelectProfession() {

    if (this.complaintInput.codeProf == 3) {
      this.isOtherProfess = true;
      this.complaintForm.controls['other'].enable();
    }
    else {
      this.complaintForm.controls['other'].disable();
    }
  }
  onAnnuler() {
    this.complaintForm.reset();
  }
  onSubmitForm() {


    if (this.complaintForm.valid) {

      this.router.navigate(['/addComplaintStep2'], { state: this.complaintInput });
    }
    else {
      if (this.complaintForm.get('email').invalid) {
        this.showFormError = true;
        this.invalidMail = true;
      }
      if (this.complaintForm.get('telephone').invalid) {
        this.showFormError = true;
        this.invalidPhone = true;
      }
      if (this.complaintForm.get('profession').invalid) {
        this.showFormError = true;
        this.invalidProfession = true;
      }
      if (this.complaintForm.get('account').invalid) {
        this.showFormError = true;
        this.invalidAccount = true;
      }
      if (this.complaintForm.get('client').invalid) {
        this.showFormError = true;
        this.invalidClient = true;
      }
      if (this.complaintForm.get('other').invalid) {
        this.showFormError = true;
        this.invalidOtherProfession = true;
      }
    }
  }



}


