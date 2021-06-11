import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { AccountDetailResponse } from 'src/app/shared/models/account-details-response';
import { Role } from 'src/app/shared/models/role';
import { UpdateAccountRequest } from 'src/app/shared/requests/update-account-request';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-account-detail',
  templateUrl: './view-account-detail.component.html',
  styleUrls: ['./view-account-detail.component.scss']
})
export class ViewAccountDetailComponent implements OnInit {
  url: string;
  id: any;
  accountDetail: AccountDetailResponse;
  accountDetailForm: FormGroup
  roles: Role[] = [
    { id: 1, roleName: "Admin" },
    { id: 2, roleName: "Nhân viên y tế" },
    { id: 3, roleName: "Bệnh nhân" },
  ];
  medicineNameMinL = 3;
  updateAccountrequest: UpdateAccountRequest;
  activeStatus: string;
  constructor(
    private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
    private formsBuider: FormBuilder,
    private router: Router,
    private generalService: GeneralHelperService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.accountDetailForm = this.formsBuider.group({
      internalCode: ['', [
        Validators.required,
      ]],
      displayName: ['', [
        Validators.required,
        Validators.minLength(this.medicineNameMinL)
      ]],
      email: ['', [
        Validators.required,

      ]],
      phoneNumber: ['', [

      ]],
      roleId: ['', [
        Validators.required,
      ]],
      active: ['', [
        Validators.required,

      ]],
      description: ['', [
      ]]
    });
    this.getAccountForm();
    console.log(this.accountDetail.role.accounts[0].active);
    this.activeStatus = this.checkActiveId(this.accountDetail.role.accounts[0].active);
  }

  get f() {
    return this.accountDetailForm.controls;
  }

  editAccount(data: UpdateAccountRequest) {
    // this.updateAccountrequest = data;
    this.generalService.openWaitingPopupNz();
    console.log(data);
    this.summaryService.updateAccount(this.id, data).subscribe(
      (response) => {
        console.log(response);
        this.generalService.messageNz('success', 'Thông tin tài khoản của "' + this.accountDetailForm.get("displayName").value + '" đã được cập nhật');
      }, (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
    this.generalService.closeWaitingPopupNz();
  }

  disableAllField() {
    // this.accountDetailForm.controls['internalCode'].disable();
    // this.accountDetailForm.controls['displayName'].disable();
    // this.accountDetailForm.controls['email'].disable();
    // this.accountDetailForm.controls['phoneNumber'].disable();
    // this.accountDetailForm.controls['roleId'].disable();
    // this.accountDetailForm.controls['active'].disable();
    // this.accountDetailForm.controls['description'].disable();

  }

  checkActiveId(id: boolean) {
    if (id) {
      return "Hoạt động";
    }
    else {
      return "Dừng hoạt động";
    }
  }

  getAccountForm() {
    this.summaryService.getAccountDetail(this.id).subscribe(
      (response) => {
        this.accountDetail = response.data;
        console.log(this.accountDetail);
        this.url = this.accountDetail.photoUrl;
        this.accountDetailForm.setValue({
          internalCode: this.accountDetail.role.accounts[0].internalCode,
          displayName: this.accountDetail.displayName,
          email: this.accountDetail.email,
          phoneNumber: this.accountDetail.phoneNumber,
          roleId: this.accountDetail.role.id,
          active: this.accountDetail.role.accounts[0].active,
          description: this.accountDetail.description,
        });
      },
      (error) => {
        console.log(error);
      },
    );

  }

}
