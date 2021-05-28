import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { InsertAccountComponent } from './insert-account/insert-account.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [InsertAccountComponent],
  exports:[InsertAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule.forChild(),
  ]
})

export class AccountModule {
  
 }
