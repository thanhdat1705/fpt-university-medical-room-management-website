import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
import { SideNavService } from 'src/app/shared/services/side-nav.service';
import { IBreadcrumb } from "../../shared/interfaces/breadcrumb.type";
import { ThemeConstantService } from '../../shared/services/theme-constant.service';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
})

export class CommonLayoutComponent  {

    isCollapsed: boolean;

    constructor(private router: Router, private sidenav: SideNavService) {
       
    }

    ngOnInit() {
        this.sidenav.isMenuCollapsedChanges.subscribe(isisCollapsed => this.isCollapsed = isisCollapsed);
    }
}