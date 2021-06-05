import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Account } from '../../models/account';
import { AuthService } from '../../services/auth-service/auth.service';
import { SideNavService } from '../../services/side-nav.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  avatar: string;
  user: Account;
  toggleActive: boolean = false;
  isCollapsed: boolean;
  constructor(private sidenav: SideNavService, private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.showUserAvatar();
    // console.log(this.avatar);
    // this.avatar = this.user.photoUrl;
  }

  // showUserAvatar(){
  //   this.avatar = JSON.parse(localStorage.getItem("avatar"));
  // }

  ToggleNav() {

    console.log('Clicked');
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sidenav.toggleCollapse(this.isCollapsed);
  }

  signOut(){
    this.authService.SignOut();
  }

}
