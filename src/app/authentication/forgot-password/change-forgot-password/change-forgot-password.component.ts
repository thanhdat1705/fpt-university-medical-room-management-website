import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-change-forgot-password',
  templateUrl: './change-forgot-password.component.html',
  styleUrls: ['./change-forgot-password.component.scss']
})
export class ChangeForgotPasswordComponent implements OnInit {
  newPasswordForm: FormGroup
  constructor(
    private summaryService: SummaryService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private generalService: GeneralHelperService
    ) { }

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      newPassword: [''],
      confirmNewPassword: [''],
    })
  }

  changeForgotPassword(data: any) {
    this.summaryService.changeForgotPassword(data).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', 'Mật khẩu mới đã được cập nhật');
        localStorage.setItem("token", null);
        this.summaryService.setTokenHeader();
        this.router.navigate(['/authentication/login']);
      }, (error) => {
        console.log(error);
      }
    )
  }
}
