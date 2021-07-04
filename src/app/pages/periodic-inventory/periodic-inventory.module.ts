import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicInventoryRoutingModule } from './periodic-inventory-routing.module';
import { ExportPeriodicInventoryComponent } from './export-periodic-inventory/export-periodic-inventory.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    
  ExportPeriodicInventoryComponent],
  imports: [
    CommonModule,
    PeriodicInventoryRoutingModule,
    SharedModule.forChild(),
  ],
})
export class PeriodicInventoryModule { }
