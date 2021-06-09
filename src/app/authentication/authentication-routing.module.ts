import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/components/error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
