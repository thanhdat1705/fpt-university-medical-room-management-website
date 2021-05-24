import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
import { IBreadcrumb } from "../../shared/interfaces/breadcrumb.type";
import { ThemeConstantService } from '../../shared/services/theme-constant.service';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent  {

    breadcrumbs$: Observable<IBreadcrumb[]>;
    contentHeaderDisplay: string;
    isFolded : boolean ;
    isSideNavDark : boolean;
    isExpand: boolean;
    selectedHeaderColor: string;

    constructor(private router: Router) {
       
    }

    ngOnInit() {
       
    }

    // private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    //     let label = '', path = '/', display = null;

    //     if (route.routeConfig) {
    //         if (route.routeConfig.data) {
    //             label = route.routeConfig.data['title'];
    //             path += route.routeConfig.path;
    //         }
    //     } else {
    //         label = 'Dashboard';
    //         path += 'dashboard';
    //     }

    //     const nextUrl = path && path !== '/dashboard' ? `${url}${path}` : url;
    //     const breadcrumb = <IBreadcrumb>{
    //         label: label, url: nextUrl
    //     };

    //     const newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    //     if (route.firstChild) {
    //         return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    //     }
    //     return newBreadcrumbs;
    // }
}