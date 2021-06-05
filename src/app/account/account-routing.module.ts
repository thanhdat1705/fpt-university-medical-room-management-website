import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { SearchAccountComponent } from './search-account/search-account.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ViewProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'insert-account',
    component: InsertAccountComponent
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
