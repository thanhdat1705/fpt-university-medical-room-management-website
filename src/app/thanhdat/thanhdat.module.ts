import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThanhdatComponent } from './thanhdat.component';
import { ThanhdatRoutes } from './thanhdat.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    ThanhdatRoutes
  ],
  declarations: [ThanhdatComponent]
})
export class ThanhdatModule { }
