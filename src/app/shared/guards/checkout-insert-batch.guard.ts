import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { AddBatchMedicineComponent } from 'src/app/pages/batch-medicine-management/batch-medicine-list/add-batch-medicine/add-batch-medicine.component';
import { ImportBatchService } from '../services/import-batch/import-batch.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})
export class CheckoutInsertBatchGuard implements CanDeactivate<CanComponentDeactivate> {
  confirmModal!: NzModalRef;
  // isDestroy = true;

  constructor(
    private importBatchService: ImportBatchService,
    private modal: NzModalService,) { }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('ImportMedicineList') != null) {
      if (JSON.parse(localStorage.getItem('ImportMedicineList')).length > 0) {
        this.confirmModal = this.modal.confirm({
          nzTitle: '<i>Bạn chưa nhập thuốc vào lô xong?</i>',
          nzContent: 'Bạn có chắc bạn muốn xóa và đóng cửa sổ này không?',
          nzWidth: '35%',
          nzMaskClosable: false,
          nzClosable: false,
          nzCancelText: 'Không',
          nzOkText: 'Có',
          nzOnOk: () => {
            console.log('OK');
            localStorage.removeItem('ImportMedicineList');
            return true;
          },
          nzOnCancel:() => {
            console.log('Cancel');
            //result = false;
          }
        });
        console.log(this.confirmModal);
        // this.confirmModal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
        return this.confirmModal.afterClose.toPromise();
        // this.confirmModal.afterClose.toPromise().then(resultConfirm => {
        //   console.log('[afterClose] The result is:', resultConfirm);
        //   console.log(result);
        //   console.log(this.confirmModal);

        //   if (this.confirmModal.result == undefined) {
        //     this.confirmModal.result = false;
        //   }else{
        //     this.confirmModal.result = true;
        //   }
        // });
        // Return a result when closed
        // this.confirmModal.afterClose.subscribe(result => {
        //   console.log('[afterClose] The result is:', result)
        //   console.log(this.confirmModal);
        //   if (this.confirmModal.result == 'undefined') {
        //     this.confirmModal.result = false;
        //   }
        // });
        // const status = window.confirm('Bạn có muốn hủy lô nhập hiện tại không');
        // console.log(status);
        // if (status) {
        //   localStorage.removeItem('ImportMedicineList');
        // }
        // return status;
      }
    }

    return true;
  }

}
