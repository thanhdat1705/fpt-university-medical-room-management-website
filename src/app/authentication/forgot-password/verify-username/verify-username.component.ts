import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordCodeResponse } from 'src/app/shared/responses/forgot-password-code';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-verify-username',
  templateUrl: './verify-username.component.html',
  styleUrls: ['./verify-username.component.scss']
})
export class VerifyUsernameComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;
  forgotPasswordForm: FormGroup;
  pattern = '[a-zA-Z0-9 ]*';
  forgotPasswordCodeResponse : ForgotPasswordCodeResponse;

  constructor(private formBuilder: FormBuilder, private router: Router, private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern(this.pattern),
      ]],
    });
  }

  sendingCodeForgotPassword(data: any) {
    this.summaryService.sendingCodeForgotPassword(data).subscribe(
      (response) => {
        console.log(response);
        this.forgotPasswordCodeResponse = response.data;
        console.log(this.forgotPasswordCodeResponse.tokenForgotPassword);
        
        localStorage.setItem("token", this.forgotPasswordCodeResponse.tokenForgotPassword);
        this.summaryService.setTokenHeader();
        this.router.navigate(['/authentication/forgot-password/send-forgot-password-code']);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
