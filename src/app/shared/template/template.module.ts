import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [FooterComponent],
  exports: [
     FooterComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule.forChild(),
  ],

})
export class TemplateModule { }
