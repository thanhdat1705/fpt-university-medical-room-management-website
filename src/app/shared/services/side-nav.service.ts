import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SideNavService {
	isMenuCollapsed: boolean = false

	private sidenav: MatSidenav;

	constructor() { }

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public open() {
		return this.sidenav.open();
	}


	public close() {
		return this.sidenav.close();
	}

	public toggle() {
		console.log(this.sidenav);
		return this.sidenav.toggle();
	}

	private isMenuCollapsedActived = new BehaviorSubject<boolean>(this.isMenuCollapsed);
	isMenuCollapsedChanges: Observable<boolean> = this.isMenuCollapsedActived.asObservable();

	toggleCollapse(isCollapsed: boolean) {
		this.isMenuCollapsedActived.next(isCollapsed);
	}
}
