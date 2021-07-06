import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account, AccountHeader } from '../../models/account';
import { AuthService } from '../../services/auth-service/auth.service';
import { HeaderService } from '../../services/header.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../../services/side-nav.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  user: AccountHeader
  avatar: string;
  name: string
  role: string
  // user: Account = JSON.parse(localStorage.getItem("user"));
  toggleActive: boolean = false;
  isCollapsed: boolean;


  constructor(private sidenav: SideNavService, private sanitizer: DomSanitizer, private authService: AuthService, public headerService: HeaderService) {
  }



  ngOnInit(): void {
    this.getProfile();
    console.log(this.role);
  }


  getProfile() {
    this.avatar= this.headerService.getAvatar();
    this.name = this.headerService.getName();
    this.role = this.headerService.getRole();
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

  // getImgAvatar() {
  //   return this.sidenav.getImgUrl();
  // }
}
