import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportPeriodicInventoryComponent } from './export-periodic-inventory/export-periodic-inventory.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'export',
    pathMatch: 'full'
  },
  { 
    path: 'export', 
    component: ExportPeriodicInventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicInventoryRoutingModule { }
