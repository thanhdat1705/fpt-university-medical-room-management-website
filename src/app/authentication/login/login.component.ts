import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { LOGINLOGO } from 'src/assets/images/logo/logo';
import { GOOGLEICON } from 'src/assets/images/svg/svg';
import { LOGINBACKGROUND } from 'src/assets/others/others-image';
import { AuthService } from './../../shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: Account;

  googleSvg = GOOGLEICON;
  loginBackGround = LOGINBACKGROUND;
  loginLogo = LOGINLOGO;
  
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public summaryService: SummaryService,
    public generalService: GeneralHelperService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(data: any): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.generalService.openWaitingPopupNz();
    this.authService.loginWithUsernameAccount(data);
    console.log(data);

    this.generalService.closeWaitingPopupNz();
  }
}
