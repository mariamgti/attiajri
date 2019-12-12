import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { ComplaintObject } from 'src/app/models/ComplaintObject';
import { Data } from 'src/app/services/Data.service';
import { formatDate } from '@angular/common';
import { ComplaintDoc } from '../../../models/ComplaintDoc';
import { HttpClient } from '@angular/common/http';
import { DocumentHeader } from '../../../models/DocumentHeader';
import { ConstantParams } from '../../../services/constantParams/constant.params';
import { FormConfirmConctInfoComponent } from '../../modal-pages/form-confirm-conct-info/form-confirm-conct-info.component';
import { MatDialog } from '@angular/material';
import { ComplaintInput } from 'src/app/models/ComplaintInput';

@Component({
  selector: 'app-add-complaint-step2',
  templateUrl: './add-complaint-step2.component.html',
  styleUrls: ['./add-complaint-step2.component.scss']
})
export class AddComplaintStep2Component implements OnInit {
  response: string;
  invalidIncedentDate: boolean = false;
  invalidDescription: boolean = false;
  invalidComplaintObject: boolean = false;
  invalidComplaintDoc: boolean = false;
  showFormError: boolean = false;
  complaintDocuments: ComplaintDoc[] = [];
  complaintForm: FormGroup;
  listComplaintObjects: ComplaintObject[];
  documentHeader: DocumentHeader;
  isSuccess: boolean;
  uploadedFilesNumber: number = 0;
  confrirmContactInfo: boolean = false;
  showConfirmContactInfo: boolean = false;
  notConfrirmContactInfo: boolean = false;
  complaintInput: ComplaintInput;


  constructor(private formBuilder: FormBuilder, private constantParams: ConstantParams, private dialog: MatDialog, private clientWsService: ClientWsService, private http: HttpClient, private data: Data,
    private complaintService: ComplaintService,
    private router: Router) {
    this.router.getCurrentNavigation().extras.state;
  }
  ngOnInit() {


    this.complaintInput = history.state;




    if (this.complaintInput.isUpdate === true) {
      this.uploadedFilesNumber = this.complaintInput.files.length;
    }

    this.initForm();
    this.complaintService.getAllcomplaintObjects().subscribe(data => {
      this.listComplaintObjects = data;
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

    if (this.uploadedFilesNumber < 2) {



      if (($event.target.files[0].type === 'application/pdf' || 'image/*') && ($event.target.files[0].size <= 9000000)) {
        this.complaintInput.files.push($event.target.files[0]);
      }
      else {

        //affiche msg error
      }


      this.uploadedFilesNumber = this.complaintInput.files.length;
    }

  }
  onClick(element) {
    const fileUpload = document.getElementById(element) as HTMLInputElement;
    fileUpload.click();
  }
  remove(index) {

    this.complaintInput.files.splice(index, 1);
    this.uploadedFilesNumber = this.complaintInput.files.length;
  }



  openDialog(): void {


    //**********//
    //In updating mode
    if (this.complaintInput.isUpdate === true) {
      //check if there is no changes at phone an email
      if (this.complaintInput.complaint.client.email == this.complaintInput.email && this.complaintInput.complaint.client.phone == this.complaintInput.phone) {

        this.onSubmitForm();
      }
      //check if phone is changed or email is changed not both

      //check if email is changed

      if (this.complaintInput.complaint.client.email != this.complaintInput.email && this.complaintInput.complaint.client.phone == this.complaintInput.phone) {
        const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
          data: {
            titre: 'Validation Mise à jour des données personnelles',
            contenu: 'Nous vous informons que la nouvelle adresse mail ' + this.complaintInput.email + ' que vous avez saisi sera désormais utilisée par Attijari Bank pour tout type de notifications : relevés de compte, news letter, messages d informations, etc.', data: this.data, annuler: true
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            //this.complaintInput.email = this.complaintInput.email;
            this.complaintInput.phone = this.complaintInput.complaint.client.phone
            this.onSubmitForm();
          }
          if (result === false) {
            this.complaintInput.email = this.complaintInput.complaint.client.email;
            this.complaintInput.phone = this.complaintInput.complaint.client.phone;
            this.onSubmitForm();
          }
        });
      }
      //check if phone is changed
      if (this.complaintInput.complaint.client.phone != this.complaintInput.phone && this.complaintInput.complaint.client.email == this.complaintInput.email) {
        const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
          data: {
            titre: 'Validation Mise à jour des données personnelles',
            contenu: 'Nous vous informons que le nouveau numéro de téléphone ' + this.complaintInput.phone + ' que vous avez saisi sera désormais utilisé par Attijari Bank pour tout type de notifications : Attijari SMS, messages d’informations, etc.', data: this.data, annuler: true
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.complaintInput.email = this.complaintInput.complaint.client.email;
            this.complaintInput.phone = this.complaintInput.phone;
            this.onSubmitForm();
          }
          if (result === false) {
            this.complaintInput.email = this.complaintInput.complaint.client.email;
            this.complaintInput.phone = this.complaintInput.complaint.client.phone;
            this.onSubmitForm();
          }
        });
      }

      //check if phone and email are both changed in the same  time
      if (this.complaintInput.client.email != this.complaintInput.email && this.complaintInput.client.phone != this.complaintInput.phone) {
        //display dialog to confirm changing the email and the phone
        const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
          data: {
            titre: 'Validation Mise à jour des données personnelles',
            contenu: 'Nous vous informons que la nouvelle adresse mail ' + this.complaintInput.email + ' que vous avez saisi sera désormais utilisée par Attijari Bank pour tout type de notifications : relevés de compte, news letter, messages d informations, etc.'
              + '\r\n' +
              '\n \r Nous vous informons que le nouveau numéro de téléphone ' + this.complaintInput.phone + ' que vous avez saisi sera désormais utilisé par Attijari Bank pour tout type de notifications : Attijari SMS, messages d’informations, etc.'
            , data: this.data, annuler: true
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {

            this.onSubmitForm();
          }

          if (result === false) {
            this.complaintInput.phone = this.complaintInput.complaint.client.phone;
            this.complaintInput.email = this.complaintInput.complaint.client.email;
            this.onSubmitForm();
          }

        });
      }
    }
    //**********//
    //In adding mode
    if (this.complaintInput.isUpdate === false) {


      //check if there is no changes at phone an email
      if (this.complaintInput.client.email == this.complaintInput.email && this.complaintInput.client.phone == this.complaintInput.phone) {

        this.onSubmitForm();
      }
      //check if phone is changed or email is changed not both
      if (this.complaintInput.client.email != this.complaintInput.email || this.complaintInput.client.phone != this.complaintInput.phone) {
        //check if email is changed
        if (this.complaintInput.client.email != this.complaintInput.email) {
          const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
            data: {
              titre: 'Validation Mise à jour des données personnelles',
              contenu: 'Nous vous informons que la nouvelle adresse mail ' + this.complaintInput.email + ' que vous avez saisi sera désormais utilisée par Attijari Bank pour tout type de notifications : relevés de compte, news letter, messages d informations, etc.', data: this.data, annuler: true
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              //this.complaintInput.email = this.complaintInput.email;
              this.complaintInput.phone = this.complaintInput.client.phone
              this.onSubmitForm();
            }
            if (result === false) {
              this.complaintInput.email = this.complaintInput.client.email;
              this.complaintInput.phone = this.complaintInput.client.phone;
              this.onSubmitForm();
            }
          });
        }
        //check if phone is changed
        if (this.complaintInput.client.phone != this.complaintInput.phone) {
          const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
            data: {
              titre: 'Validation Mise à jour des données personnelles',
              contenu: 'Nous vous informons que le nouveau numéro de téléphone ' + this.complaintInput.phone + ' que vous avez saisi sera désormais utilisé par Attijari Bank pour tout type de notifications : Attijari SMS, messages d’informations, etc.', data: this.data, annuler: true
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
              this.complaintInput.email = this.complaintInput.client.email;

              this.onSubmitForm();
            }
            if (result === false) {

              this.complaintInput.phone = this.complaintInput.client.phone;
              this.onSubmitForm();
            }
          });
        }
      }
      //check if phone and email are both changed in the same  time
      if (this.complaintInput.client.email != this.complaintInput.email && this.complaintInput.client.phone != this.complaintInput.phone) {
        //display dialog to confirm changing the email
        const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
          data: {
            titre: 'Validation Mise à jour des données personnelles',
            contenu: 'Nous vous informons que la nouvelle adresse mail ' + this.complaintInput.email + ' que vous avez saisi sera désormais utilisée par Attijari Bank pour tout type de notifications : relevés de compte, news letter, messages d informations, etc.', data: this.data, annuler: true
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.complaintInput.email = this.complaintInput.email;
            //display dialog to confirm changing the pohne
            if (this.complaintInput.client.phone != this.complaintInput.phone) {
              const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
                data: {
                  titre: 'Validation Mise à jour des données personnelles',
                  contenu: 'Nous vous informons que le nouveau numéro de téléphone ' + this.complaintInput.phone + ' que vous avez saisi sera désormais utilisé par Attijari Bank pour tout type de notifications : Attijari SMS, messages d’informations, etc.', data: this.data, annuler: true
                }
              });
              dialogRef.afterClosed().subscribe(result => {
                if (result === true) {

                  this.onSubmitForm();
                }
                if (result === false) {
                  this.complaintInput.phone = this.complaintInput.client.phone;
                  this.onSubmitForm();
                }
              });
            }
          }
          if (result === false) {
            this.complaintInput.email = this.complaintInput.client.email;
            //display dialog to confirm changing the pohne
            if (this.complaintInput.client.phone != this.complaintInput.phone) {
              const dialogRef = this.dialog.open(FormConfirmConctInfoComponent, {
                data: {
                  titre: 'Validation Mise à jour des données personnelles',
                  contenu: 'Nous vous informons que le nouveau numéro de téléphone ' + this.complaintInput.email + ' que vous avez saisi sera désormais utilisé par Attijari Bank pour tout type de notifications : Attijari SMS, messages d’informations, etc.', data: this.data, annuler: true
                }
              });
              dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                  this.onSubmitForm();
                }
                if (result === false) {
                  this.complaintInput.phone = this.complaintInput.client.phone;
                  this.onSubmitForm();
                }
              });
            }
          }
        });
      }
    }
  }
  onSubmitForm() {
console.log( this.complaintInput.autreProf)
    if (this.complaintForm.valid) {
      if (this.complaintInput.isUpdate === false) {
        this.complaintService.addComplaint(
          this.complaintInput.client.codCli,
          this.complaintInput.objectCode,
          this.complaintInput.complDetails,
          formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          this.complaintInput.login,
          this.complaintInput.phone,
          this.complaintInput.email,
          this.complaintInput.client.homeAddress,
          this.complaintInput.client.city,
          this.complaintInput.client.postCode,
          this.complaintInput.codeProf,
          this.complaintInput.autreProf,
          this.complaintInput.flgSupp,
          formatDate(this.complaintInput.incedentDate, 'dd/MM/yyyy', 'en'),
          this.complaintInput.numCpt,
          this.complaintInput.files
        ).subscribe(data => {
          this.documentHeader = data;
          this.isSuccess = this.documentHeader.resultCode == "0000"
          if (this.documentHeader.resultCode == "0000") {
            this.data.storage = this.isSuccess;
            this.router.navigateByUrl('/resultComplaint');
          }
        })
      }
      else if (this.complaintInput.isUpdate === true) {

        this.complaintService.updateComplaint(
          this.complaintInput.complRef,
          this.complaintInput.objectCode,
          this.complaintInput.complDetails,
          formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          this.complaintInput.login,
          this.complaintInput.phone,
          this.complaintInput.email,
          this.complaintInput.client.homeAddress,
          this.complaintInput.client.city,
          this.complaintInput.client.postCode,
          this.complaintInput.codeProf,
          this.complaintInput.autreProf,
          this.complaintInput.flgSupp,
          this.complaintInput.client.codCli,
          formatDate(this.complaintInput.incedentDate, 'dd/MM/yyyy', 'en'),
          this.complaintInput.numCpt,
          this.complaintInput.files
        ).subscribe(data => {
          this.documentHeader = data;
          this.isSuccess = this.documentHeader.resultCode == "0000"
          if (this.documentHeader.resultCode == "0000") {
            this.data.storage = this.isSuccess;
            this.router.navigateByUrl('/resultComplaint')
          }
        })
      }
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
    }
  }
  cancel() {
    this.router.navigate(['/addComplaint']);
  }
}
