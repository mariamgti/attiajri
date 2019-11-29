import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepaidCardListComponent } from './pages/card-list/prepaid-card-list/prepaid-card-list.component';
import { DebitCardListComponent } from './pages/card-list/debit-card-list/debit-card-list.component';
import { ConfirmActivationPrepaidCardComponent } from './pages/confirm-activation-prepaid-card/confirm-activation-prepaid-card.component';
import { PageLoginComponent } from './pages/login/page-login/page-login.component';
import { ConfirmDeconnectionComponent } from './pages/modal-pages/confirm-deconnection/confirm-deconnection.component';
import { ConfirmActivationDebitCardComponent } from './pages/confirm-activation-debit-card/confirm-activation-debit-card.component';
import { ResultActivationComponent } from './result-activation/result-activation.component';
import { SicavValueComponent } from './sicavValue-list/sicav-value/sicav-value.component';
import { ComplaintListComponent } from './pages/complaint/complaint-list/complaint-list.component';
import { AddComplaintComponent } from './pages/complaint/add-complaint-step1/add-complaint.component';
import { AddComplaintStep2Component } from './pages/complaint/add-complaint-step2/add-complaint-step2.component';
import { SurveyComponent } from './pages/complaint/survey/survey.component';
import { ViewComplaintComponent } from './pages/complaint/view-complaint/view-complaint.component';
import { ResultAddComplaintComponent } from './pages/complaint/result-add-complaint/result-add-complaint.component';
import { ShareAccountComponent } from './pages/share-account/share-account.component';
import { FiabilisationComponent } from './pages/fiabilisation/fiabilisation.component';
import { RedirectResolveService } from './services/redirect-resolve.service';
import { AccessGuardService } from './services/access-guard.service';

const appRoutes: Routes = [
  {
    path: '', component: PageLoginComponent,
    resolve: {
      result: RedirectResolveService
    }
  },
  {
    path: 'index', component: PageLoginComponent,
    resolve: {
      result: RedirectResolveService
      
    }
  },
  { path: 'listeCartesPrepayees', component: PrepaidCardListComponent ,canActivate : [AccessGuardService]},
  { path: 'listeCartesDebit', component: DebitCardListComponent ,canActivate : [AccessGuardService]},
  { path: 'confirm-activation-carte-prepaye', component: ConfirmActivationPrepaidCardComponent ,canActivate : [AccessGuardService]},
  { path: 'confirmerDéconnexion', component: ConfirmDeconnectionComponent ,canActivate : [AccessGuardService]},
  { path: 'confirm-activation-carte-debit', component: ConfirmActivationDebitCardComponent ,canActivate : [AccessGuardService]},
  { path: 'resultActivation', component: ResultActivationComponent ,canActivate : [AccessGuardService]},
  { path: 'sicavValue', component: SicavValueComponent ,canActivate : [AccessGuardService]},
  { path: 'complaintsList', component: ComplaintListComponent ,canActivate : [AccessGuardService]},
  { path: 'addComplaint', component: AddComplaintComponent  ,canActivate : [AccessGuardService]},
  { path: 'addComplaintStep2', component: AddComplaintStep2Component ,canActivate : [AccessGuardService]  },
  { path: 'survey', component: SurveyComponent ,canActivate : [AccessGuardService]},
  { path: 'viewComplaint', component: ViewComplaintComponent,canActivate : [AccessGuardService] },
  { path: 'resultComplaint', component: ResultAddComplaintComponent ,canActivate : [AccessGuardService]},
  { path: 'fiabilisation', component: FiabilisationComponent,canActivate : [AccessGuardService] },
  { path: 'shareAccount', component: ShareAccountComponent,canActivate : [AccessGuardService] },


]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes),RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
