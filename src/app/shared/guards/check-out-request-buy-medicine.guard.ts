import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutRequestBuyMedicineGuard implements CanDeactivate<unknown> {
  confirmModal!: NzModalRef;

  constructor(
    private modal: NzModalService,) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('BuyMedicineListDisplay') != null) {
        if (JSON.parse(localStorage.getItem('BuyMedicineListDisplay')).length > 0) {
          this.confirmModal = this.modal.confirm({
            nzTitle: '<i>Bạn chưa tạo đơn yêu cầu mua dược phẩm xong?</i>',
            nzContent: 'Bạn có chắc bạn muốn xóa và đóng cửa sổ này không?',
            nzWidth: '35%',
            nzMaskClosable: false,
            nzClosable: false,
            nzCancelText: 'Không',
            nzOkText: 'Có',
            nzOnOk: () => {
              console.log('OK');
              localStorage.removeItem('BuyMedicineListDisplay');
              return true;
            },
            nzOnCancel:() => {
              console.log('Cancel');
              //result = false;
            }
          });
          return this.confirmModal.afterClose.toPromise();
        }
      }
    return true;
  }
  
}
