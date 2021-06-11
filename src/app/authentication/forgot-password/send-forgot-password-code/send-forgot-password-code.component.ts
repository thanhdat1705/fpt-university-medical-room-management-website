import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-send-forgot-password-code',
  templateUrl: './send-forgot-password-code.component.html',
  styleUrls: ['./send-forgot-password-code.component.scss']
})
export class SendForgotPasswordCodeComponent implements OnInit {

  forgotPasswordCodeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private sumaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) {

  }

  ngOnInit(): void {
    this.forgotPasswordCodeForm = this.formBuilder.group({
      verifyCode: [''],
    });
  }
  sendingCodeForgotPassword(data: any) {
    this.generalService.openWaitingPopupNz();
    this.sumaryService.verifyingCodeForgotPassword(data).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', 'Xác thực thành công');
        this.router.navigate(['/authentication/forgot-password/change-forgot-password']);
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      },
    );
    this.generalService.openWaitingPopupNz();
  }

}
