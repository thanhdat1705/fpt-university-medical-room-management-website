import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { GeneralHelperService } from './shared/services/general-helper.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { FirebaseService } from './shared/services/firebase.service';
import { SideNavService } from './shared/services/side-nav.service';

export const firebaseConfig = {
  apiKey: "AIzaSyB0T2DzZAZkv0O0yyGzAA-UF8dyOQiA2RM",
  authDomain: "fucs-1ee4c.firebaseapp.com",
  projectId: "fucs-1ee4c",
  storageBucket: "fucs-1ee4c.appspot.com",
  messagingSenderId: "421263472733",
  appId: "1:421263472733:web:c0f9e372b8427e1496b5b4",
  measurementId: "G-XK70Q0VCZF",
};

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    FullLayoutComponent,
  ],
  exports: [TemplateModule],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    // SharedModule,
    TemplateModule,
  ],
  providers: [GeneralHelperService, FirebaseService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
