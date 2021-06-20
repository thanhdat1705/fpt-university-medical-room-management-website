import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AccountModule } from 'src/app/account-management/account.module';
import { AuthService } from '../services/auth-service/auth.service';
import { SideNavService } from '../services/side-nav.service';



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
    AccountModule,
  ],
  providers: [
    AuthService,
    SideNavService,
  ]

})

export class TemplateModule { }
