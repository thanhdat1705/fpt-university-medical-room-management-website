import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailsMedicineComponent } from 'src/app/pages/medicine-management/medicine-list/details-medicine/details-medicine.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutDetailMedicineGuard implements CanDeactivate<DetailsMedicineComponent> {
  canDeactivate(
    component: DetailsMedicineComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.isUpdating) {
      // component.isUpdating = false;
      console.log('ahihi');
      return window.confirm('Bạn có chắc muốn hủy việc cập nhật hiện tại');
    }
    console.log('ahuhu');
    return true;
  }

}
