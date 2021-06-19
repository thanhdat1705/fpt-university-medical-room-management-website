import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { InsertAccountRequest } from 'src/app/shared/interfaces/account/insert-account-request';
import { Role } from 'src/app/shared/models/role';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';



@Component({
  selector: 'app-insert-account',
  templateUrl: './insert-account.component.html',
  styleUrls: ['./insert-account.component.scss']
})
export class InsertAccountComponent implements OnInit {

  accountForm: FormGroup;
  roles: Role[] = [
    { id: 1, roleName: "Admin" },
    { id: 2, roleName: "Nhân viên y tế" },

  ];

  usernameMinLength = 3;
  passwordMinLength = 3;
  usernameMaxLength = 50;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z0-9 ]*';
  patternPassword = '[a-zA-Z0-9]*';

  matcher = new MyErrorStateMatcher;
  // convenience getter for easy access to form fields
  get f() { return this.accountForm.controls; }

  constructor(
    private formBuilder: FormBuilder, 
    private generalService: GeneralHelperService, 
    private summaryService: SummaryService) { }

  insertAccount(data: InsertAccountRequest) {
    console.log(data);
    this.generalService.openWaitingPopupNz();
    if (this.accountForm.invalid) {
      this.generalService.closeWaitingPopupNz();
      return;
    }
    console.log(data);
    this.summaryService.insertAccount(data).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', 'Tài khoản "'+ this.accountForm.get('usernanme').value +'" đã được tạo');
      },
      (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
    this.generalService.closeWaitingPopupNz();
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      username: ['', [Validators.required,
      Validators.minLength(this.usernameMinLength),
      Validators.maxLength(this.usernameMaxLength),
      Validators.pattern(this.pattern),
      ]],
      email: ['', [
        // Validators.required,
        // Validators.minLength(this.passwordMinLength),
        // Validators.maxLength(this.passwordMaxLength),
        Validators.email,
      ]],
      password: ['',
        [Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
        Validators.pattern(this.patternPassword)
      ]],
      internalCode: ['', [Validators.required,
      // Validators.minLength(this.usernameMinLength),
      // Validators.maxLength(this.usernameMaxLength),
      Validators.pattern(this.pattern),
      ]],
      displayName: ['',[
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          // Validators.pattern(this.pattern)
        ]],
      roleId: ['',[
        Validators.required
      ]],
    }
    );
  }

}
