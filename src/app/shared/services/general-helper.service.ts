import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WaitingComponent } from '../components/waiting/waiting.component';
import { DateTime } from '../models/date-time';


@Injectable({
    providedIn: 'root'
})
export class GeneralHelperService {

    minCharacterLength = 3;
    maxInputCharacterLength = 50;
    maxTextAreaCharacterLength = 50;
    

    constructor(
        private router: Router,
        private notification: NzNotificationService,
        private modal: NzModalService,
        private message: NzMessageService
    ) { }

    openWaitingPopupNz() {
        this.modal.create({
            nzContent: WaitingComponent,
            nzFooter: null,
            nzMaskClosable: false,
            nzClosable: false,
            nzWidth: 'fit-content',
        });
    }

    messageNz(type: string, content: string) {
        if (type === 'success') { this.message.success(content, { nzDuration: 5000 }); }
        if (type === 'error') { this.message.error(content, { nzDuration: 5000 }); }
    }

    closeWaitingPopupNz() {
        // const ref: NzModalRef = this.modal.info();
        // ref.destroy();
        this.modal.closeAll();
    }

    showRequiredError(fieldName: string) {
        return fieldName + " không được trống";
    }

    showMinMaxLengthError(fieldName: string, minLength: number, maxLength: number) {
        return fieldName + " phải từ " + minLength + " đến " + maxLength + " kí tự";
    }

    showNumberPatternError(fieldName: string){
        return fieldName + " phải là số";
    }

    showEmailPatternError(){
        "Email phải được nhập đúng format (example@email.com)"
    }

    showPatternError(fieldName: string){
        return fieldName + " không được chứa kí tự đặc biệt";
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
                    // 'Error code: ' + error.error.statusCode,
                    'Error code: ' + error.statusCode,
                    // error.error.message,
                    error.message,
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

    getToStringTime(time: DateTime): string {
        var result = "";
        if (time.day < 10) {
            result = result + '0' + time.day + '-';
        } else {
            result = result + time.day + '-';
        }
        if (time.month < 10) {
            result = result + '0' + time.month + '-';
        } else {
            result = result + time.month + '-';
        }
        result = result + time.year + ' ';
        if (time.hour < 10) {
            result = result + '0' + time.hour + ':';
        } else {
            result = result + time.hour + ':';
        }
        if (time.minute < 10) {
            result = result + '0' + time.minute + ':';
        } else {
            result = result + time.minute + ':';
        }
        if (time.second < 10) {
            result = result + '0' + time.second;
        } else {
            result = result + time.second;
        }
        return result;
    }

    getDate(time: string) {
        var subs = time.split('-');
        var result = '';
        for (var i = subs.length - 1; i >= 0; i--) {
            if (subs[i].toString().includes('T')) {
                var tmp = subs[i].toString().split('T');
                result = result + tmp[0];
            } else {
                result = result + '-' + subs[i].toString();
            }


        }
        return result;
    }

    MustMatch(controlName: string, matchingControlName: string) {

        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value != matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }


}
