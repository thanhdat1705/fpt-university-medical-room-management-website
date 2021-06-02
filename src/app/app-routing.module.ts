import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { SearchAccountComponent } from './account/search-account/search-account.component';
import { ViewProfileComponent } from './account/view-profile/view-profile.component';
import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayout_ROUTES
  },  
  {
    path: '',
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES
  },
  { 
    path: 'view-profile', 
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
