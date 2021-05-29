import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SideNavService } from 'src/app/shared/services/side-nav.service';
import { IBreadcrumb } from "../../shared/interfaces/breadcrumb.type";
import { ThemeConstantService } from '../../shared/services/theme-constant.service';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent {

    isCollapsed: boolean;
    isVisible = false;
    constructor(
        private router: Router,
        private sidenav: SideNavService,
        private modal: NzModalService,
        private notification: NzNotificationService,
    ) { }

    ngOnInit() {
        this.sidenav.isMenuCollapsedChanges.subscribe(isisCollapsed => this.isCollapsed = isisCollapsed);
    }

    // changeLayoutOnDevice() {
    //     this.deviceInfo = this.deviceService.getDeviceInfo();
    //     this.isMobile = this.deviceService.isMobile();
    //     console.log(this.isMobile);
    //     if(this.isMobile){
    //       this.siderWidth = "30";
    //     }else{
    //       this.siderWidth = "18";
    //     }
    //   }

}