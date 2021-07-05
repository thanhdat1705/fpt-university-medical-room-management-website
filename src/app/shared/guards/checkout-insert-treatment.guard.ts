import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { AddTreatmentInformationComponent } from 'src/app/pages/treatment-information-management/add-treatment-information/add-treatment-information.component';
import { ViewTreatmentInformationComponent } from 'src/app/pages/treatment-information-management/view-treatment-information-list/view-treatment-information/view-treatment-information.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutInsertTreatmentGuard implements CanDeactivate<AddTreatmentInformationComponent> {
  confirmModal!: NzModalRef;


  constructor(
    private modal: NzModalService,) { }


  canDeactivate(
    component: AddTreatmentInformationComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (component.insertTreatmentInformationForm.dirty) {

          this.confirmModal = this.modal.confirm({
            nzTitle: '<i>Bạn chưa hoàn thành đơn điều trị?</i>',
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