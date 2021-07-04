import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddMedicineComponent } from 'src/app/pages/medicine-management/medicine-list/add-medicine/add-medicine.component';
import { ViewTreatmentInformationComponent } from 'src/app/pages/treatment-information-management/view-treatment-information-list/view-treatment-information/view-treatment-information.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutUpdateTreatmentGuard implements CanDeactivate<ViewTreatmentInformationComponent> {
  canDeactivate(
    component: ViewTreatmentInformationComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.isEditing && component.treatmentForm.dirty) {
        return window.confirm('Thông tin đơn đang được cập nhật, bạn có chắc muốn rồi khởi trang hiện tại?');
      }
  }
  
}