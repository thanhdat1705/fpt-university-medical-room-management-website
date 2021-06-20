import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared.module';
import { AccountModule } from 'src/app/account/account.module';
import { AuthService } from '../services/auth-service/auth.service';
import { SideNavService } from '../services/side-nav.service';



@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    SharedModule.forChild(),
    AccountModule,
  ],
  providers: [
    AuthService,
    SideNavService,
  ]

})

export class TemplateModule { }
