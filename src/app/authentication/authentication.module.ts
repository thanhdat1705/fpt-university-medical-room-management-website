import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth-service/auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyUsernameComponent } from './forgot-password/verify-username/verify-username.component';
import { SendForgotPasswordCodeComponent } from './forgot-password/send-forgot-password-code/send-forgot-password-code.component';
import { ChangeForgotPasswordComponent } from './forgot-password/change-forgot-password/change-forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyUsernameComponent,
    SendForgotPasswordCodeComponent,
    ChangeForgotPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule.forChild(),
  ],
  providers: [
    AuthService
  ]
})
export class AuthenticationModule { }
