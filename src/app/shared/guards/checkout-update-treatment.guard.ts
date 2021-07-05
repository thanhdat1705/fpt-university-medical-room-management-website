import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ViewTreatmentInformationComponent } from 'src/app/pages/treatment-information-management/view-treatment-information-list/view-treatment-information/view-treatment-information.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutUpdateTreatmentGuard implements CanDeactivate<ViewTreatmentInformationComponent> {
  confirmModal!: NzModalRef;


  constructor(
    private modal: NzModalService,) { }


  canDeactivate(
    component: ViewTreatmentInformationComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.isEditing && component.treatmentForm.dirty) {

          this.confirmModal = this.modal.confirm({
            nzTitle: '<i>Bạn chưa lưu các thay đổi?</i>',
            nzContent: 'Bạn có chắc muốn rời khỏi trang không?',
            nzWidth: '35%',
            nzMaskClosable: false,
            nzClosable: false,
            nzCancelText: 'Không',
            nzOkText: 'Có',
            nzOnOk: () => {
              console.log('OK');
              return true;
            },
            nzOnCancel:() => {
              console.log('Cancel');
              //result = false;
            }
          });
          console.log(this.confirmModal);

          return this.confirmModal.afterClose.toPromise();
 
        
      }
  
      return true;
    }
  
     
}