import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WaitingComponent } from '../components/waiting/waiting.component';


@Injectable({
    providedIn: 'root'
})
export class GeneralHelperService {

    constructor(
        private router: Router,
        private notification: NzNotificationService,
        private modal: NzModalService
    ) {}

    openWaitingPopupNz() {
        this.modal.create({
            nzContent: WaitingComponent,
            nzFooter: null,
            nzMaskClosable: false,
            nzClosable: false,
            nzWidth: 'fit-content',
        });
    }
    

    closeWaitingPopupNz() {
        // const ref: NzModalRef = this.modal.info();
        // ref.destroy();
        this.modal.closeAll();
    }

    createErrorNotification(error: any) {
        if (error.status != undefined) {
            if (error.status == 404) {
                this.notification.error(
                    'Error code: ' + error.status,
                    error.statusText,
                    {
                        nzPlacement: 'bottomRight',
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: '#ffccc7',
                        },
                    }
                );
            }
            else if (error.status == 400) {
                this.notification.error(
                    'Error code: ' + error.status,
                    error.error.message,
                    {
                        nzPlacement: 'bottomRight',
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: '#ffccc7',
                        },
                    },
                );
            }
            else if (error.status == 0) {
                this.notification.error(
                    'Error code: ' + error.status,
                    'Server Error!!',
                    {
                        nzPlacement: 'bottomRight',
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: '#ffccc7',
                        },
                    }
                );
            }
            else {
                this.notification.error(
                    'Error code: ' + error.error.statusCode,
                    error.error.message,
                    { nzPlacement: 'bottomRight' }
                );
            }
        } else {
            this.notification.error(
                'Error system',
                error,
                {
                    nzPlacement: 'bottomRight',
                    nzStyle: {
                        width: '400px',
                        marginLeft: '-265px',
                        backgroundColor: '#ffccc7',
                    },
                }
            );
        }
    }




}
