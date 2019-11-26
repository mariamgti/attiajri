import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComplaintService } from '../../../services/complaint.service';
import { Router } from '@angular/router';
import { ClientModel } from '../../../models/client.model';
import { ClientWsService } from '../../../services/client-ws.service';
import { Profession } from '../../../models/profession';
import { Data } from 'src/app/services/Data.service';
import { CustomValidationService } from 'src/app/services/customValidationService';

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


  clientInformation: [any, any, any, any, any, any];
  profession: string;
  other: string;
  professions: Profession[];
  isOther: boolean;
  selectedClient: ClientModel;
  client: ClientModel;
  accounts: any;
  complaintForm: FormGroup;
  email: string;
  phone: string;



  constructor(private formBuilder: FormBuilder, private clientWsService: ClientWsService, private data: Data, private customValidationService: CustomValidationService,
    private complaintService: ComplaintService,

    private router: Router) { }
  ngOnInit() {

    this.initForm();
    if (!this.isOther) {
      this.complaintForm.controls['other'].disable();
    } else {
      this.complaintForm.controls['other'].enable();
    }
    this.clientWsService.findClientByCodeClient(1).subscribe(data => {

      this.client = data;
    });



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
    this.email = this.selectedClient.email;
    this.phone = this.selectedClient.phone;

    this.clientWsService.findCompteByCodeClient(this.selectedClient.codCli).subscribe((data: {}) => {

      this.accounts = data;

      this.complaintService.getProfessions().subscribe(data => {
        this.professions = data;
      })

    });

  }

  onChange() {
    this.profession = this.complaintForm.get('profession').value
    console.log('this is this.professions', this.profession)
    if (this.profession === 'Autre') {
      this.other = this.complaintForm.get('other').value
      console.log('this is the other profession', this.other)
      this.complaintForm.controls['other'].enable();
      this.isOther = true;
    }
    else {
      this.complaintForm.controls['other'].disable();
    }

  }

  onAnnuler() {
    this.complaintForm.reset();



  }
  onSubmitForm() {

    console.log("this is the body of the client", this.complaintForm.get('client').value)
    this.clientInformation = [
      this.complaintForm.get('client').value,
      this.complaintForm.get('account').value,
      this.complaintForm.get('email').value,
      this.complaintForm.get('telephone').value,
      this.complaintForm.get('profession').value,
      this.complaintForm.get('other').value,
    ]
    const formValue = this.complaintForm.value;
    console.log(formValue)
    if (this.complaintForm.valid) {
      this.data.storage = this.clientInformation;
      this.router.navigate(['/addComplaintStep2']);
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


