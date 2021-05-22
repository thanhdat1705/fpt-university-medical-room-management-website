import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { SideNavService } from '../side-nav/side-nav.service';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	toggleActive:boolean = false;

  constructor(private sidenav: SideNavService) {
  }

  ngOnInit(): void {
  }

  ToggleNav() {

    console.log('Clicked');
    this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();
	}

}
