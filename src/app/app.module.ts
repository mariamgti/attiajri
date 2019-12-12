import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoPratiqueComponent } from './page-footer/info-pratique/info-pratique.component';
import { PageFooterComponent } from './page-footer/page-footer/page-footer.component';
import { DebitCardDetailComponent } from './pages/card-detail/debit-card-detail/debit-card-detail.component';
import { PrepaidCardDetailComponent } from './pages/card-detail/prepaid-card-detail/prepaid-card-detail.component';
import { DebitCardListComponent } from './pages/card-list/debit-card-list/debit-card-list.component';
import { PrepaidCardListComponent } from './pages/card-list/prepaid-card-list/prepaid-card-list.component';
import { AddComplaintComponent } from './pages/complaint/add-complaint-step1/add-complaint.component';
import { AddComplaintStep2Component } from './pages/complaint/add-complaint-step2/add-complaint-step2.component';
import { ResultAddComplaintComponent } from './pages/complaint/result-add-complaint/result-add-complaint.component';
import { ResultSurveyComponent } from './pages/complaint/survey/result-survey/result-survey.component';
import { StarRatingComponent } from './pages/complaint/survey/star-rating/star-rating.component';
import { SurveyComponent } from './pages/complaint/survey/survey.component';
import { ViewComplaintComponent } from './pages/complaint/view-complaint/view-complaint.component';
import { ConfirmActivationDebitCardComponent } from './pages/confirm-activation-debit-card/confirm-activation-debit-card.component';
import { ConfirmActivationPrepaidCardComponent } from './pages/confirm-activation-prepaid-card/confirm-activation-prepaid-card.component';
import { FiabilisationComponent } from './pages/fiabilisation/fiabilisation.component';
import { HeaderNotLoginComponent } from './pages/login/header-not-login/header-not-login.component';
import { PageLoginBodyComponent } from './pages/login/page-login-body/page-login-body.component';
import { SlideInComponent } from './pages/logged-in/slide-in/slide-in.component';
import { BgHeaderAuthComponent } from './pages/logged-in/header-login/header-login.component';
import { PageLoginComponent } from './pages/login/page-login/page-login.component';
import { SlideInLoginComponent } from './pages/login/slide-in-login/slide-in-login.component';
import { ConfirmDeconnectionComponent } from './pages/modal-pages/confirm-deconnection/confirm-deconnection.component';
import { FormConfirmConctInfoComponent } from './pages/modal-pages/form-confirm-conct-info/form-confirm-conct-info.component';
import { FormErrorComponent } from './pages/modal-pages/form-error/form-error.component';
import { LoadPageComponent } from './pages/modal-pages/load-page/load-page.component';
import { PasswordRequiredComponent } from './pages/modal-pages/password-required/password-required.component';
import { ShareAccountComponent } from './pages/share-account/share-account.component';
import { ResultActivationComponent } from './result-activation/result-activation.component';
import { AttijariBankApiWsService } from './services/attijari-bank-api-ws.service';
import { AuthService } from './services/auth.service';
import { CartesMxpWS } from './services/cartes-Mxp-ws';
import { ClientWsService } from './services/client-ws.service';
import { ComplaintService } from './services/complaint.service';
import { ConfirmActivationService } from './services/confirm-activation.service';
import { ConstantParams } from './services/constantParams/constant.params';
import { Data } from './services/Data.service';
import { ShareAccountService } from './services/share-account.service';
import { CustomValidationService } from './services/customValidationService';
import { RedirectResolveService } from './services/redirect-resolve.service';
import { AccessGuardService } from './services/access-guard.service';
import { SicavValueService } from './services/sicav-value.service';
import { SicavValueComponent } from './sicavValue-list/sicav-value/sicav-value.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent, FiabilisationComponent, FormErrorComponent,
    PageLoginComponent, ShareAccountComponent,
    HeaderNotLoginComponent,
    PageLoginBodyComponent,
    PageFooterComponent,
    BgHeaderAuthComponent,
    PrepaidCardListComponent,
    DebitCardListComponent,
    PrepaidCardDetailComponent,
    DebitCardDetailComponent,
    SlideInComponent,
    InfoPratiqueComponent,
    ConfirmActivationPrepaidCardComponent,
    PasswordRequiredComponent,
    ConfirmDeconnectionComponent,
    LoadPageComponent,
    ConfirmActivationDebitCardComponent,
    SlideInLoginComponent,
    ResultActivationComponent,
    SicavValueComponent,
    AddComplaintComponent,
    AddComplaintStep2Component,
    SurveyComponent,
    ViewComplaintComponent,
    ResultAddComplaintComponent,
    FormErrorComponent,
    StarRatingComponent,
    ResultSurveyComponent,
    FormConfirmConctInfoComponent,

  ],
  imports: [
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [FormConfirmConctInfoComponent],
  providers: [ClientWsService, ConstantParams, ConfirmActivationService, AttijariBankApiWsService, AuthService, CartesMxpWS, CustomValidationService,
    ,SicavValueService,ComplaintService,ShareAccountService,Data,RedirectResolveService,AccessGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
