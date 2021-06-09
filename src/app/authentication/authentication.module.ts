import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from '../shared/components/error/error.component';
import { AuthService } from '../shared/services/auth-service/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    
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
