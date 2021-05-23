import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
