import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';
import { WaitingComponent } from '../components/waiting/waiting.component';
import { DateTime } from '../models/date-time';
import { ValueCompare } from '../requests/search-request';
import { AuthService } from './auth-service/auth.service';


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
            // nzStyle	: {backgroundColor: 'red'},
            // nzMaskStyle	: {backgroundColor: 'blue'},
            // nzBodyStyle: {backgroundColor: 'transparent'},
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

    showNumberPatternError(fieldName: string) {
        return fieldName + " phải là số";
    }
    showPhoneNumberPatternError() {
        return "Số điện thoại phải là số";
    }

    showEmailPatternError() {
        return "Email phải được nhập đúng format (example@email.com)"
    }

    showPatternError(fieldName: string) {
        return fieldName + " không được chứa kí tự đặc biệt";
    }


    getValueCompare(value: any, valueCompare: ValueCompare, searchRecordAttribute: string, searchRecord: Record<string, ValueCompare> = {}) {
        if (value != null) {
            valueCompare.value = value;
            searchRecord[searchRecordAttribute] = valueCompare;
        } else {
            searchRecord[searchRecordAttribute] = null;
        }
    }

    createSuccessNotification(content: string) {
        let backgroundColorSuccess = "#f6ffed";
        let posion: NzNotificationPlacement = 'topRight';
        let border = 'thin solid #b7eb8f';
        let duration = 3000;
        this.notification.success(
            'Thành công',
            content,
            {
                nzPlacement: posion,
                nzDuration: duration,
                nzStyle: {
                    width: '400px',
                    marginLeft: '-265px',
                    backgroundColor: backgroundColorSuccess,
                    border: border
                },
            }
        )
    }

    createErrorNotification(error: any) {
        let backgroundColorError = "#fff2f0";
        let backgroundColorWarrning = "#fffbe6";
        let posion: NzNotificationPlacement = 'bottomRight';
        let borderError = 'thin solid #ffccc7';
        let borderWarning = 'thin solid #ffe58f';
        let duration = 3000;
        if (error.status != undefined) {
            if (error.status == 404) {
                this.notification.error(
                    'Lỗi Hệ thống: ' + error.status,
                    error.statusText,
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorError,
                            border: borderError
                        },
                    }
                );
            }
            else if (error.status == 401) {
                this.notification.warning(
                    'Opp!',
                    'Phiên đăng nhập của bạn đã hết hạn',
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorWarrning,
                            border: borderWarning
                        },
                    }
                );
                localStorage.removeItem('user');
                localStorage.removeItem("token");
                this.router.navigate(['authentication/login']);
            }
            else if (error.status == 400) {
                this.notification.error(
                    'Lỗi Hệ thống: ' + error.status,
                    error.error.message,
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorError,
                            border: borderError
                        },
                    },
                );
            }
            else if (error.status == 500) {
                this.notification.error(
                    'Lỗi Hệ thống: ' + error.status,
                    error.error.message,
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorError,
                            border: borderError
                        },
                    },
                );
            }
            else if (error.status == 0) {
                this.notification.error(
                    'Lỗi Hệ thống: ' + error.status,
                    'Server Error!!',
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorError,
                            border: borderError
                        },
                    }
                );
            }
            else {
                this.notification.error(
                    'Lỗi Hệ thống: ' + error.statusCode,
                    error.message,
                    {
                        nzPlacement: posion,
                        nzDuration: duration,
                        nzStyle: {
                            width: '400px',
                            marginLeft: '-265px',
                            backgroundColor: backgroundColorError,
                            border: borderError
                        },
                    }
                );
            }
        } else {
            this.notification.error(
                'Lỗi Hệ thống: ',
                error,
                {
                    nzPlacement: posion,
                    nzDuration: duration,
                    nzStyle: {
                        width: '400px',
                        marginLeft: '-265px',
                        backgroundColor: backgroundColorError,
                        border: borderError
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

    getYMD(date: string) {
        var dt = new Date(date);
        var newDate = '';
        // return newdate.toLocaleString().replace('/', '-').split(',')[1].replace('/', '-');
        // return newdate.toISOString().split('T')[0];
        newDate = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
        return newDate;
    }

    removeDotInString(text: string) {
        var removeDot = text.replace(/\./g, '');
        return removeDot;
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
