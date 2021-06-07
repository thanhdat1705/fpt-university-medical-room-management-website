import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/shared/models/account';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { EditAccountRequest } from 'src/app/shared/requests/edit-account-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

interface role{
  id: string;
  roleName: string;    
}

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})

export class EditAccountComponent implements OnInit {

  editAccountForm: FormGroup;
  accountDetail: EditAccountRequest;
  matcher = new MyErrorStateMatcher;
  usernameMinLength = 3;
  passwordMinLength = 3;
  usernameMaxLength = 50;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z ]*';
  phoneNumberPattern = '[0-9]*';
  selected = '2';

 

  roleList: role[] = [
    { id: '1', roleName: 'Nhân viên y tế' },
    { id: '2', roleName: 'Quản lí' },
    { id: '', roleName: 'Bệnh nhân' },
    // { value: 'roleId', viewValue: 'Role' }

  ]

  get f() {
    return this.editAccountForm.controls;
  }

  constructor(private summaryService: SummaryService, private formBuilber: FormBuilder, private generalService: GeneralHelperService) { }

  updateAccount(data: any) {
    if (this.editAccountForm.invalid) {
      return;
    }
    this.generalService.openWaitingPopupNz();
    this.summaryService.updateAccount(data).subscribe(
      (response) => {
        console.log(response);

      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
        this.generalService.closeWaitingPopupNz();
      }
    );
    this.generalService.closeWaitingPopupNz();
  }

  ngOnInit(): void {
    this.editAccountForm = this.formBuilber.group({
      email: ['abc@fpt.edu.vn',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      displayName: ['this.accountDetail.displayName',
        [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          // Validators.pattern(this.pattern)
        ]
      ],
      internalCode: ['this.accountDetail.internalCode',
        [
          Validators.required,
        ]
      ],
      //  phoneNumber: [this.accountDetail.phoneNumber,
      // [
      //   Validators.required,
      //   Validators.minLength(this.passwordMinLength),
      //   Validators.maxLength(this.passwordMaxLength),
      //   // Validators.pattern(this.pattern)
      // ]],
      roleId: ['this.accountDetail.roleId',
      ],
      active: ['this.accountDetail.active'
      ]
    });
  }

}
