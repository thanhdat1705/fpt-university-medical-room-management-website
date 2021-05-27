import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SideNavService } from '../../services/side-nav.service';
import { ROUTES } from './side-nav.routing';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer', {static: true}) sidenav: MatSidenav;
  deviceInfo = null;
  isMobile = null;
  ToggleMode = "side";

  public menuItems: any[]

  constructor(private sidenavService: SideNavService, private deviceService: DeviceDetectorService) {
    // this.selectMode();

  }


  selectMode() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    console.log(this.isMobile);
    if(this.isMobile){
      this.ToggleMode = "over";
    }else{
      this.ToggleMode = "side";
    }
  }

  ngOnInit(): void {
		this.sidenavService.setSidenav(this.sidenav);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.menuItems);
  }
  
  Toggle(){
    this.sidenav.toggle();
  }

}
