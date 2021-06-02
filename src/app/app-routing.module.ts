import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
