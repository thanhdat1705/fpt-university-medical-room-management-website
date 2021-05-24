import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer', {static: true}) sidenav: MatSidenav;
  deviceInfo = null;
  isMobile = null;
  ToggleMode = "side";

  constructor(private sidenavService: SideNavService, private deviceService: DeviceDetectorService) {
    this.selectMode();

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
    
  }
  
  Toggle(){
    this.sidenav.toggle();
  }

}
