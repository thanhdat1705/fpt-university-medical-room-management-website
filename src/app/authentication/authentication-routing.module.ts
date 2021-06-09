import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { patch } from '@nebular/theme';
import { ErrorComponent } from './error/error.component';
import { ChangeForgotPasswordComponent } from './forgot-password/change-forgot-password/change-forgot-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendForgotPasswordCodeComponent } from './forgot-password/send-forgot-password-code/send-forgot-password-code.component';
import { VerifyUsernameComponent } from './forgot-password/verify-username/verify-username.component';
import { LoginComponent } from './login/login.component';
import { ThanhdatComponent } from './thanhdat/thanhdat.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: 'Error'
    }
  },
  {
    path: 'thanhdat',
    component: ThanhdatComponent,
    data: {
      title: 'Thanhdat'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    children: [{
      path: "verify-username",
      component: VerifyUsernameComponent,
    },
    {
      path: "send-forgot-password-code",
      component: SendForgotPasswordCodeComponent,
    },
    {
      path: "change-forgot-password",
      component: ChangeForgotPasswordComponent,
    },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
