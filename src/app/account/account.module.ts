import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { SharedModule } from '../shared/shared.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchAccountComponent } from './search-account/search-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LinkToSocialAccountComponent } from './link-to-social-account/link-to-social-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';



@NgModule({
  declarations: [InsertAccountComponent, ViewProfileComponent, EditProfileComponent, SearchAccountComponent, ChangePasswordComponent, LinkToSocialAccountComponent, EditAccountComponent, ],
  exports:[InsertAccountComponent, ViewProfileComponent, EditProfileComponent, SearchAccountComponent, ChangePasswordComponent, LinkToSocialAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule.forChild(),
  ]
})

export class AccountModule {
  
 }
