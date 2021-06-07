import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth-service/auth.service';
import { SideNavService } from '../../services/side-nav.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  toggleActive: boolean = false;
  isCollapsed: boolean;
  constructor(public sidenav: SideNavService, public auth: AuthService) {
  }

  ngOnInit(): void {
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

  getImgAvatar() {
    return this.sidenav.getImgUrl();
  }
}
