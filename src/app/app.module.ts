import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SharedModule } from './shared/shared.module';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { TemplateModule } from './shared/template/template.module';
import { AccountModule } from './account/account.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './shared/services/auth-service/auth.service';
import { FirebaseService } from './shared/services/firebase.service';
import { MyErrorStateMatcher } from './shared/my-error-state-matcher';
import { GeneralHelperService } from './shared/services/general-helper.service';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
  ],
  exports: [TemplateModule, AccountModule],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    TemplateModule,
    // AccountModule,
  ],
  providers: [AuthService, FirebaseService,
    { provide: NZ_I18N, useValue: en_US},
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher},
    GeneralHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
