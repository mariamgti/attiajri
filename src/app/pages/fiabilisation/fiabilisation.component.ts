import { Component, OnInit } from '@angular/core';
import { ReliabilityService } from 'src/app/services/reliability.service';
import { FormGroup  ,FormBuilder, FormControl  , Validators } from '@angular/forms';
import { ClientWsService } from 'src/app/services/client-ws.service';
import { DocumentHeader } from 'src/app/models/documentHeader';
import { ClientModel } from '../../models/ClientModel';


@Component({
  selector: 'app-fiabilisation',
  templateUrl: './fiabilisation.component.html',
  styleUrls: ['./fiabilisation.component.scss']
})
export class FiabilisationComponent implements OnInit {
  DocumentHeader:DocumentHeader;
  Client:ClientModel;
  emailValue:string;
  phoneValue:string;
  registerForm: FormGroup;
  warning:string;
  invalidMail: boolean = false;
  invalidPhone: boolean = false;
  showFormError: boolean = false;
  emailChanged:boolean=false;
  phoneChanged:boolean=false;
  serverError:boolean=false;
  infoNotChanged:boolean=false;
  constructor(private reliabilityService :ReliabilityService,private formBuilder: FormBuilder,private clientService : ClientWsService) { }

  ngOnInit() {
    this.loadClient();
    this.createForm();
      
  }

    // Issues list
    loadClient() {
      return this.clientService.findClientByCodeClient(1).subscribe(data => {
        this.Client = data; 
        this.emailValue=this.Client.email;
        this.phoneValue=this.Client.phone;
        
      })
    }


    createForm() {
      this.registerForm = this.formBuilder.group({
        email:new FormControl('',[Validators.required, Validators.email]) ,
        phone: new FormControl('',[Validators.required,Validators.minLength(8)]),
      });
    }
onSubmit()
{
 
  if (this.registerForm.get('email').invalid && this.registerForm.get('phone').invalid) {
  
    this.showFormError = true;
    this.invalidMail = true;
    this.invalidPhone = true;
    this.warning="Attention"
return;
  }
  if(this.emailValue!=this.Client.email|| this.phoneValue!=this.Client.phone)
  {

    return this.reliabilityService.UpdateClient(this.Client.codCli,this.emailValue,this.phoneValue).subscribe(data => {
      this.DocumentHeader = data;
   
       if(this.DocumentHeader.resultCode=="0000")
       {
        
        if(this.emailValue!=this.Client.email)
        {
          this.showFormError = true;
          this.emailChanged=true; 
          this.warning="Info";
     

        }
        if(this.phoneValue!=this.Client.phone)
        {
          this.showFormError = true;
          this.phoneChanged=true;
          this.warning="Info";
        }
      
       }else
       {
        this.showFormError = true;
        this.serverError=true; 
        this.warning="Attention"
       }
       
  
      
    })
  }
  if (this.registerForm.get('email').invalid ) {
    this.showFormError = true;
    this.invalidMail = true;
    this.warning="Attention"
return;
  }
 
  if (this.registerForm.get('phone').invalid) {
    this.showFormError = true;
    this.invalidPhone = true;
    this.warning="Attention"
  return;
  }
 
 
  if(this.emailValue==this.Client.email && this.phoneValue==this.Client.phone)
  {
    console.log("  Vous n'avez pas commis des modifications!")
    this.showFormError = true;
    this.infoNotChanged=true;
    this.warning="Attention"
  }
   

 

}

}
