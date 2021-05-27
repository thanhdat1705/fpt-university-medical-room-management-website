import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared.module';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [FooterComponent, SideNavComponent, HeaderComponent],
  exports: [
    FooterComponent,
    SideNavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule.forChild(),
  ],

})

export class TemplateModule { }
