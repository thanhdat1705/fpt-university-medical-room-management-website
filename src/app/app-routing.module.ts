import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: '',
    redirectTo: '/dashboard/default',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayout_ROUTES
  },
  // { path: 'thanhdat',loadChildren: () => import('./thanhdat/thanhdat.module').then((m) => m.ThanhdatModule)}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
