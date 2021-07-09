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
import { HostListener } from "@angular/core";
import { LOGOAPP } from 'src/assets/images/logo/logo';


@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent {
    logoApp = LOGOAPP;
    screenHeight: number;
    screenWidth: number;
    breadcrumbs$: Observable<IBreadcrumb[]>;
    roleId = localStorage.getItem("roleId");
    isCollapsed: boolean;
    isVisible = false;
    constructor(
        private router: Router,
        private sidenav: SideNavService,
        private activatedRoute: ActivatedRoute,
        public generalService: GeneralHelperService,
    ) {
        // this.getScreenSize();
    }

    ngOnInit() {
        this.sidenav.isMenuCollapsedChanges.subscribe(isisCollapsed => this.isCollapsed = isisCollapsed);
        this.breadcrumbs$ = this.router.events.pipe(
            startWith(new NavigationEnd(0, '/', '/')),
            filter(event => event instanceof NavigationEnd), distinctUntilChanged(),
            map(data => this.buildBreadCrumb(this.activatedRoute.root))
        );
        // console.log('this.activatedRoute.root ', this.activatedRoute.root)
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        // console.log(this.screenHeight, this.screenWidth);

        if (this.screenWidth == 850) {
            console.log('check');
            // this.isCollapsed = !this.isCollapsed;
            this.sidenav.toggleCollapse(true);

        }
    }
    private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        let label = '', path = '/', display = null;
        if (route.routeConfig) {
            if (route.routeConfig.data) {
                label = route.routeConfig.data['title'];
                path += route.routeConfig.path;
            }
        } else {
            label = 'Trang chủ';
            path += 'medicine-management/medicine-list';
        }

        const nextUrl = path && path !== '/medicine-management/medicine-list' ? `${url}${path}` : url;
        const breadcrumb = <IBreadcrumb>{
            label: label, url: nextUrl
        };

        const newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
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