import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepaidCardListComponent } from './pages/card-list/prepaid-card-list/prepaid-card-list.component';
import { DebitCardListComponent } from './pages/card-list/debit-card-list/debit-card-list.component';
import { ConfirmActivationPrepaidCardComponent } from './pages/confirm-activation-prepaid-card/confirm-activation-prepaid-card.component';
import { CardListComponent } from './pages/card-list/card-list/card-list.component';
import { PageLoginComponent } from './pages/login/page-login/page-login.component';
import { ConfirmDeconnectionComponent } from './pages/modal-pages/confirm-deconnection/confirm-deconnection.component';
import { ConfirmActivationDebitCardComponent } from './pages/confirm-activation-debit-card/confirm-activation-debit-card.component';
import { ResultActivationComponent } from './result-activation/result-activation.component';
import { SicavValueComponent } from './sicavValue-list/sicav-value/sicav-value.component';
import { ComplaintListComponent } from './pages/complaint/complaint-list/complaint-list.component';
<<<<<<< HEAD
import { AddComplaintComponent } from './pages/complaint/add-complaint-step1/add-complaint.component';
import { AddComplaintStep2Component } from './pages/complaint/add-complaint-step2/add-complaint-step2.component';
import { SurveyComponent } from './pages/complaint/survey/survey.component';
import { ViewComplaintComponent } from './pages/complaint/view-complaint/view-complaint.component';
import { ResultAddComplaintComponent } from './pages/complaint/result-add-complaint/result-add-complaint.component';
=======
import {FiabilisationComponent}  from './pages/fiabilisation/fiabilisation.component';
import {ShareAccountComponent}  from './pages/share-account/share-account.component';
>>>>>>> 6108728dbe38581837a354fc9234eabfbd2e9e87

const appRoutes: Routes = [
  { path: '', component: PageLoginComponent },
  { path: 'index', component: PageLoginComponent },
  { path: 'listeCartes', component: CardListComponent },
  { path: 'listeCartesPrépayées', component: PrepaidCardListComponent },
  { path: 'listeCartesDébit', component: DebitCardListComponent },
  { path: 'confirm-activation-carte-prepaye', component: ConfirmActivationPrepaidCardComponent },
  { path: 'confirmerDéconnexion', component: ConfirmDeconnectionComponent },
  { path: 'confirm-activation-carte-debit', component: ConfirmActivationDebitCardComponent },
  { path: 'resultActivation', component: ResultActivationComponent },
  { path: 'sicavValue', component: SicavValueComponent },
  { path: 'complaintsList', component: ComplaintListComponent },
  { path: 'addComplaint', component: AddComplaintComponent },
   { path: 'addComplaintStep2', component: AddComplaintStep2Component},
   { path: 'survey', component: SurveyComponent},
   { path: 'viewComplaint', component: ViewComplaintComponent},
   { path: 'resultComplaint', component: ResultAddComplaintComponent},
  { path: 'fiabilisation', component: FiabilisationComponent },
  { path: 'shareAccount', component:ShareAccountComponent },

 
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
