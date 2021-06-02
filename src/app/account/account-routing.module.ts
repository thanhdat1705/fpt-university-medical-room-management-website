import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchAccountComponent } from './search-account/search-account.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  { 
    path: 'profile', 
  component: ViewProfileComponent 
},
  { 
    path: 'edit-profile/:profile', 
    component: EditProfileComponent 
  },
  
  { 
    path: 'search-account', 
    component: SearchAccountComponent 
  },
  { 
    path: 'change-password', 
    component: ChangePasswordComponent 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
