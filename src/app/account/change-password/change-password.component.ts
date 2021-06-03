import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ChangePasswordRequest } from 'src/app/shared/interfaces/account/change-password-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private generalService: GeneralHelperService, private generalHelper: GeneralHelperService, private summaryService: SummaryService) { }

  get f() { return this.changePasswordForm.controls; }

  passwordMinLength = 3;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z]*';
  changePasswordForm: FormGroup;
  matcher = new ErrorStateMatcher;

  ngOnInit(): void {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjY0NTkwNCwiZXhwIjoxNjIzMjUwNzA0LCJpYXQiOjE2MjI2NDU5MDR9.fGRQ8GVH86_lRHYPt4YYcDDxTFqRgNgqYBTdCnZFPug");
    this.summaryService.setTokenHeader();

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [
        Validators.required,
        Validators.pattern(this.pattern),
        Validators.maxLength(this.passwordMaxLength),
        Validators.minLength(this.passwordMinLength),
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(this.pattern),
        Validators.maxLength(this.passwordMaxLength),
        Validators.minLength(this.passwordMinLength),
      ]],
      confirmNewPassword: ['', [
        Validators.required,
        Validators.pattern(this.pattern),
        Validators.maxLength(this.passwordMaxLength),
        Validators.minLength(this.passwordMinLength),
      ]],

    }, { validators: this.generalHelper.MustMatch('newPassword', 'confirmNewPassword') }
    );
  }

  changePassword(data: ChangePasswordRequest){
    if (this.changePasswordForm.invalid) {
      return ;
  }
    console.log(data);
    this.summaryService.changePassword(data).subscribe(
      (response) =>{
        console.log(response);
      },
      (error) =>{
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    )
  }

}
