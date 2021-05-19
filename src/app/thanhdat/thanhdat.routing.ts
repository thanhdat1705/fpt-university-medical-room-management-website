import { Routes, RouterModule } from '@angular/router';
import { ThanhdatComponent } from './thanhdat.component';

const routes: Routes = [
  { path: '', component: ThanhdatComponent },
];

export const ThanhdatRoutes = RouterModule.forChild(routes);
