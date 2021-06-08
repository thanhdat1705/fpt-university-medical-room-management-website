import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from '../../models/account';
import { AuthService } from '../../services/auth-service/auth.service';
import { HeaderService } from '../../services/header.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../../services/side-nav.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  avatar = this.headerService.getAvatar();
  user: Account;
  toggleActive: boolean = false;
  isCollapsed: boolean;

  constructor(private sidenav: SideNavService, private sanitizer: DomSanitizer, private authService: AuthService, public headerService: HeaderService) {
  }



  ngOnInit(): void {
    console.log(this.headerService.getAvatar());
  }

  showAvatar() {
    // this.avatar = this.headerService.avatar;
    // this.sanitizer.bypassSecurityTrustUrl(this.);
  }

  ToggleNav() {
    console.log('Clicked');
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sidenav.toggleCollapse(this.isCollapsed);
  }

  signOut() {
    this.authService.SignOut();
  }

  getImgAvatar() {
    return this.sidenav.getImgUrl();
  }
}
