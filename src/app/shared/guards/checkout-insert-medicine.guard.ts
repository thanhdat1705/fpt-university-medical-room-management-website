import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddMedicineComponent } from 'src/app/medicine-management/medicine-list/add-medicine/add-medicine.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutInsertMedicineGuard implements CanDeactivate<AddMedicineComponent> {
  canDeactivate(
    component: AddMedicineComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.isInserting && component.medicineForm.dirty) {
        return window.confirm('Bạn có chắc muốn hủy việc thêm dược phẩm hiện tại');
      }
      return true;
  }
  
}
