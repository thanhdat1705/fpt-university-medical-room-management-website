// import { CanadaIcon, FranceIcon, JapanIcon, SouthKoreaIcon, USAIcon, VietNamIcon } from './../sharings/assets/icons/country_icon';

import { FormGroup } from "@angular/forms";

// import { ManHairCutIcon, ManHairWaxIcon, WoManHairCutIcon, FaceWashWoManIcon, FaceWashManIcon, ShampooIcon, ShavingIcon, SkinCareIcon } from './../sharings/assets/icons/service_icon';
// import { GOOGLELOGO, FACEBOOKLOGO, TWITTERLOGO, INSTAGRAMLOGO, ZALOLOGO } from './../sharings/assets/assets';
// import { DomSanitizer } from '@angular/platform-browser';
// import { MatIconRegistry } from '@angular/material/icon';
// import { MessageComponent } from './../sharings/components/message/message.component';
// import { LineChartModel, BarChartModel, PieChartModel, DonutChartModel } from './../sharings/models/chart-model';
// import { DateTime } from './../sharings/models/date-time';
// import { CenterPopupMessageComponent } from './../sharings/components/center-popup-message/center-popup-message.component';
// import { WaitingComponent } from './../sharings/components/waiting/waiting.component';

// import { Router } from '@angular/router';

// import { FormGroup } from '@angular/forms';

// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { Injectable } from '@angular/core';
// import { ChartDataSets } from 'chart.js';
// import { Label, Color } from 'ng2-charts';
// import { AutofillMonitor } from '@angular/cdk/text-field';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


// @Injectable({
//   providedIn: 'root'
// })
export class GeneralHelperService {

    //   private dialogWaitingPopupRef!: MatDialogRef<WaitingComponent>;
    //   constructor(private dialog: MatDialog, private router: Router,
    //     private matIconRegistry: MatIconRegistry,
    //     private domSanitizer: DomSanitizer,
    //     private notification: NzNotificationService,
    //     private modal: NzModalService) {
    //     //Social Icon
    //     this.matIconRegistry.addSvgIcon("Google-logo",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(GOOGLELOGO));
    //     this.matIconRegistry.addSvgIcon("Facebook-logo",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(FACEBOOKLOGO));
    //     this.matIconRegistry.addSvgIcon("Twitter-logo",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(TWITTERLOGO));
    //     this.matIconRegistry.addSvgIcon("Instagram-logo",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(INSTAGRAMLOGO));
    //     this.matIconRegistry.addSvgIcon("Zalo-logo",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(ZALOLOGO));

    //     //Service Icon
    //     this.matIconRegistry.addSvgIcon("ManHairCutIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(ManHairCutIcon));
    //     this.matIconRegistry.addSvgIcon("ManHairWaxIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(ManHairWaxIcon));
    //     this.matIconRegistry.addSvgIcon("WoManHairCutIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(WoManHairCutIcon));
    //     this.matIconRegistry.addSvgIcon("FaceWashWoManIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(FaceWashWoManIcon));
    //     this.matIconRegistry.addSvgIcon("FaceWashManIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(FaceWashManIcon));
    //     this.matIconRegistry.addSvgIcon("ShampooIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(ShampooIcon));
    //     this.matIconRegistry.addSvgIcon("ShavingIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(ShavingIcon));
    //     this.matIconRegistry.addSvgIcon("SkinCareIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(SkinCareIcon));

    //     //Country icon
    //     this.matIconRegistry.addSvgIcon("CanadaIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(CanadaIcon));
    //     this.matIconRegistry.addSvgIcon("FranceIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(FranceIcon));
    //     this.matIconRegistry.addSvgIcon("JapanIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(JapanIcon));
    //     this.matIconRegistry.addSvgIcon("SouthKoreaIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(SouthKoreaIcon));
    //     this.matIconRegistry.addSvgIcon("USAIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(USAIcon));
    //     this.matIconRegistry.addSvgIcon("VietNamIcon",
    //       this.domSanitizer.bypassSecurityTrustResourceUrl(VietNamIcon));
    //   }

    //   openCenterPopupMessage(title: any, message: any) {
    //     this.dialog.open<CenterPopupMessageComponent>(CenterPopupMessageComponent, {
    //       disableClose: true,
    //       data: { title: title, message: message }
    //     });
    //   }

    //   openWaitingPopup() {
    //     this.dialogWaitingPopupRef = this.dialog.open(WaitingComponent, {
    //       disableClose: true
    //     });
    //   }

    //   closeWaitingPopup() {
    //     //this.dialogWaitingPopupRef.getState().
    //     this.dialogWaitingPopupRef.close();
    //   }

    //   openWaitingPopupNz() {
    //     this.modal.create({
    //       nzContent: WaitingComponent,
    //       nzFooter: null,
    //       nzMaskClosable: false,
    //       nzClosable: false,
    //       nzWidth: 'fit-content',
    //     });
    //   }

    //   closeWaitingPopupNz() {
    //     // const ref: NzModalRef = this.modal.info();
    //     // ref.destroy();
    //     this.modal.closeAll();
    //   }

    //   hasErrorInputValidation(controlName: string, errorName: string, inputFormControl: FormGroup): boolean {
    //     return inputFormControl.controls[controlName].hasError(errorName);
    //   }

    //   getToStringTime(time: DateTime): string {
    //     var result = "";
    //     if (time.day < 10) {
    //       result = result + '0' + time.day + '-';
    //     } else {
    //       result = result + time.day + '-';
    //     }
    //     if (time.month < 10) {
    //       result = result + '0' + time.month + '-';
    //     } else {
    //       result = result + time.month + '-';
    //     }
    //     result = result + time.year + ' ';
    //     if (time.hour < 10) {
    //       result = result + '0' + time.hour + ':';
    //     } else {
    //       result = result + time.hour + ':';
    //     }
    //     if (time.minute < 10) {
    //       result = result + '0' + time.minute + ':';
    //     } else {
    //       result = result + time.minute + ':';
    //     }
    //     if (time.second < 10) {
    //       result = result + '0' + time.second;
    //     } else {
    //       result = result + time.second;
    //     }
    //     return result;
    //   }
    //   convertToDonutChartModel(dataResponse: any): DonutChartModel {
    //     //console.log(dataResponse);
    //     var chartModel: DonutChartModel;
    //     var chartData: number[] = dataResponse.dataSets;
    //     var chartLabels: Label[] = dataResponse.chartLabel;
    //     var chartColors: Color[] = [];

    //     chartColors.push(
    //       {
    //         backgroundColor: ['rgba(254, 201, 87, 0.2)', 'rgba(54, 162, 235, 0.2)',
    //           'rgba(37, 213, 242, 0.2)'],
    //         borderColor: ['rgba(254, 201, 87, 1)', 'rgba(54, 162, 235, 1)',
    //           'rgba(37, 213, 242, 1)'],
    //       }
    //     );
    //     chartModel = {
    //       chartData: chartData,
    //       chartLabels: chartLabels,
    //       chartColors: chartColors,
    //       chartOptions: {
    //         responsive: true
    //       },
    //       chartLegend: true,
    //       chartType: 'doughnut',
    //       chartPlugins: []
    //     };
    //     return chartModel;
    //   }
    //   convertToPieChartModel(dataResponse: any): PieChartModel {
    //     //console.log(dataResponse);
    //     var chartModel: PieChartModel;
    //     var pieChartData: number[] = dataResponse.dataSets;
    //     var pieChartLabels: Label[] = dataResponse.chartLabel;
    //     var pieChartColors: Color[] = [];

    //     pieChartColors.push(
    //       {
    //         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
    //           'rgba(37, 213, 242, 0.2)'],
    //         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
    //           'rgba(37, 213, 242, 1)'],
    //       }
    //     );
    //     chartModel = {
    //       chartData: pieChartData,
    //       chartLabels: pieChartLabels,
    //       chartColors: pieChartColors,
    //       chartOptions: {
    //         responsive: true
    //       },
    //       chartLegend: true,
    //       chartType: 'pie',
    //       chartPlugins: []
    //     };
    //     return chartModel;
    //   }
    //   convertToLineChartModel(dataResponse: any): LineChartModel {
    //     //console.log(dataResponse);
    //     var chartModel: LineChartModel;
    //     var lineChartData: ChartDataSets[] = dataResponse.dataSets;
    //     var lineChartLabels: Label[] = dataResponse.chartLabel;
    //     var lineChartColors: Color[] = [];

    //     lineChartColors.push(
    //       {
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255, 99, 132, 1)',
    //       },
    //       {
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgba(54, 162, 235, 1)',
    //       }
    //     );
    //     chartModel = {
    //       chartData: lineChartData,
    //       chartLabels: lineChartLabels,
    //       chartColors: lineChartColors,
    //       chartOptions: {
    //         responsive: true
    //       },
    //       chartLegend: true,
    //       chartType: 'line',
    //       chartPlugins: []
    //     };
    //     return chartModel;
    //   }
    //   convertToBarChartModel(dataResponse: any): BarChartModel {
    //     //console.log(dataResponse);
    //     var chartModel: BarChartModel;
    //     var barChartData: ChartDataSets[] = dataResponse.dataSets;
    //     var barChartLabels: Label[] = dataResponse.chartLabel;
    //     var barChartColors: Color[] = [];

    //     barChartColors.push(

    //       {
    //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //         borderColor: 'rgba(54, 162, 235, 1)',
    //       },
    //       {
    //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //         borderColor: 'rgba(255, 99, 132, 1)',
    //       }
    //     );
    //     chartModel = {
    //       chartData: barChartData,
    //       chartLabels: barChartLabels,
    //       chartColors: barChartColors,
    //       chartOptions: {
    //         responsive: true,

    //       },
    //       chartLegend: true,
    //       chartType: 'bar',
    //       chartPlugins: []
    //     };
    //     return chartModel;
    //   }

    //   handleMessage(title: any, message: any) {
    //     this.dialog.open(MessageComponent, {
    //       panelClass: 'myapp-no-padding-dialog',
    //       position: {
    //         bottom: '50px',
    //         right: ' 50px'
    //       },
    //       data: { title: title, message: message }
    //     });
    //   }
    //   handleError(error: any) {
    //     console.log(error);
    //     var data;
    //     if (error.status != undefined) {
    //       if (error.status == 404) {
    //         data = { title: 'Error code: ' + error.status, message: error.statusText };
    //       }
    //       else if (error.status == 400) {
    //         data = { title: 'Error cost: ' + error.status, message: error.error.message };
    //       }
    //       else if (error.status == 0) {
    //         data = { title: 'Error code: ' + error.status, message: 'Server Error!!' };
    //       }
    //       else {
    //         data = { title: 'Error code: ' + error.error.statusCode, message: error.error.message };
    //       }
    //     } else {
    //       data = { title: 'Error system', message: error };
    //     }


    //     this.dialog.open(MessageComponent, {
    //       panelClass: 'myapp-no-padding-dialog',
    //       disableClose: true,
    //       height: '210px',
    //       position: {
    //         bottom: '50px',
    //         right: ' 50px'
    //       },
    //       data: data
    //     });
    //   }

    //   createErrorNotification(error: any) {
    //     if (error.status != undefined) {

    //       if (error.status == 404) {
    //         this.notification.error(
    //           'Error code: ' + error.status,
    //           error.statusText,
    //           {
    //             nzPlacement: 'bottomRight',
    //             nzStyle: {
    //               width: '400px',
    //               marginLeft: '-265px',
    //               backgroundColor: '#ffccc7',
    //             },
    //           }
    //         );
    //       }
    //       else if (error.status == 400) {
    //         this.notification.error(
    //           'Error code: ' + error.status,
    //           error.error.message,
    //           {
    //             nzPlacement: 'bottomRight',
    //             nzStyle: {
    //               width: '400px',
    //               marginLeft: '-265px',
    //               backgroundColor: '#ffccc7',
    //             },
    //           },
    //         );
    //       }
    //       else if (error.status == 0) {
    //         this.notification.error(
    //           'Error code: ' + error.status,
    //           'Server Error!!',
    //           {
    //             nzPlacement: 'bottomRight',
    //             nzStyle: {
    //               width: '400px',
    //               marginLeft: '-265px',
    //               backgroundColor: '#ffccc7',
    //             },
    //           }
    //         );
    //       }
    //       else {
    //         this.notification.error(
    //           'Error code: ' + error.error.statusCode,
    //           error.error.message,
    //           { nzPlacement: 'bottomRight' }
    //         );
    //       }
    //     } else {
    //       this.notification.error(
    //         'Error system',
    //         error,
    //         {
    //           nzPlacement: 'bottomRight',
    //           nzStyle: {
    //             width: '400px',
    //             marginLeft: '-265px',
    //             backgroundColor: '#ffccc7',
    //           },
    //         }

    //       );
    //     }

    //   }

    //   handleErrorInput() {
    //     var data = { title: 'Error code: 400', message: 'Value input is error!!' };
    //     this.dialog.open(MessageComponent, {
    //       panelClass: 'myapp-no-padding-dialog',
    //       disableClose: true,
    //       height: '210px',
    //       position: {
    //         bottom: '50px',
    //         right: ' 50px'
    //       },
    //       data: data
    //     });
    //   }
    //   handleSpecificError(error: any) {
    //     this.dialog.open(MessageComponent, {
    //       panelClass: 'myapp-no-padding-dialog',
    //       disableClose: true,
    //       height: '210px',
    //       position: {
    //         bottom: '50px',
    //         right: ' 50px'
    //       },
    //       data: error
    //     });
    //   }
    // }
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