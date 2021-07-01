import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { LinkToSocialAccountComponent } from './link-to-social-account/link-to-social-account.component';
import { SearchAccountComponent } from './search-account/search-account.component';
import { ViewAccountDetailComponent } from './view-account-detail/view-account-detail.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ViewProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: {
      tilte: "Sửa thông tin"
    }
  },
  {
    path: 'insert-account',
    component: InsertAccountComponent,
    data: {
      title: 'Tạo tài khoản mới'
    },
  },
  {
    path: 'account-list',
    component: SearchAccountComponent,
    data: {
      title: 'Danh sách tài khoản'
    },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'link-to-social-account',
    component: LinkToSocialAccountComponent
  },
  {
    path: 'account-detail/:id',
    component: ViewAccountDetailComponent,
    data: {
      title: "Thông tin tài khoản"
    }

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
