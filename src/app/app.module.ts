import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes } from '@angular/router';
import { InfoPratiqueComponent } from './page-footer/info-pratique/info-pratique.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PrepaidCardDetailComponent } from './pages/card-detail/prepaid-card-detail/prepaid-card-detail.component';
import { DebitCardDetailComponent } from './pages/card-detail/debit-card-detail/debit-card-detail.component';
import { PrepaidCardListComponent } from './pages/card-list/prepaid-card-list/prepaid-card-list.component';
import { DebitCardListComponent } from './pages/card-list/debit-card-list/debit-card-list.component';
import { ClientWsService } from './services/client-ws.service';
import { ConstantParams } from './services/constantParams/constant.params';
import { ConfirmActivationPrepaidCardComponent } from './pages/confirm-activation-prepaid-card/confirm-activation-prepaid-card.component';
import { HeaderNotLoginComponent } from './pages/login/header-not-login/header-not-login.component';
import { PageLoginBodyComponent } from './pages/login/page-login-body/page-login-body.component';
import { SlideInComponent } from './pages/logged-in/slide-in/slide-in.component';
import { BgHeaderAuthComponent } from './pages/logged-in/header-login/header-login.component';
import { CardListComponent } from './pages/card-list/card-list/card-list.component';
import { PageLoginComponent } from './pages/login/page-login/page-login.component';
import { PageFooterComponent } from './page-footer/page-footer/page-footer.component';
import { ConfirmActivationService } from './services/confirm-activation.service';
import { PasswordRequiredComponent } from './pages/modal-pages/password-required/password-required.component';
import { ConfirmDeconnectionComponent } from './pages/modal-pages/confirm-deconnection/confirm-deconnection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadPageComponent } from './pages/modal-pages/load-page/load-page.component';
import { ConfirmActivationDebitCardComponent } from './pages/confirm-activation-debit-card/confirm-activation-debit-card.component';
import { SlideInLoginComponent } from './pages/login/slide-in-login/slide-in-login.component';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule } from '@angular/material'
import { AttijariBankApiWsService } from './services/attijari-bank-api-ws.service';
import { AuthService } from './services/auth.service';
import { CartesMxpWS } from './services/cartes-Mxp-ws';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ResultActivationComponent } from './result-activation/result-activation.component';
import { Data } from './services/Data.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    HeaderNotLoginComponent,
    PageLoginBodyComponent,
    PageFooterComponent,
    CardListComponent,
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
  ],
  imports: [
    FormsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ClientWsService, ConstantParams, ConfirmActivationService, AttijariBankApiWsService, AuthService, CartesMxpWS, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
