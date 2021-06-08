import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { AccountDetailResponse } from 'src/app/shared/models/account-details-response';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-view-account-detail',
  templateUrl: './view-account-detail.component.html',
  styleUrls: ['./view-account-detail.component.scss']
})
export class ViewAccountDetailComponent implements OnInit {

  id: any;
  accountDetail: AccountDetailResponse;
  accountDetailForm: FormGroup



  constructor(
    private summaryService: SummaryService,
    private activatedroute: ActivatedRoute,
    private formsBuider: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.getAccountForm();
  }

  f() {
    return this.accountDetailForm.controls;
  }

  editAccount() {

  }

  disableAllField() {
    this.accountDetailForm.controls['internalCode'].disable();
    this.accountDetailForm.controls['displayName'].disable();
    this.accountDetailForm.controls['email'].disable();
    this.accountDetailForm.controls['phoneNumber'].disable();
    this.accountDetailForm.controls['roleId'].disable();
    this.accountDetailForm.controls['active'].disable();
    this.accountDetailForm.controls['description'].disable();

  }

  getAccountForm() {
    this.summaryService.getAccountDetail(this.id).subscribe(
      (response) => {

        console.log(response);
        this.accountDetail = response.data;
        console.log(this.accountDetail.role.accounts[0].internalCode);

        this.accountDetailForm = this.formsBuider.group({
          internalCode: [this.accountDetail.role.accounts[0].internalCode, [
            Validators.required,
          ]],
          displayName: [this.accountDetail.displayName, [
            Validators.required,

          ]],
          email: [this.accountDetail.email, [

          ]],
          phoneNumber: [this.accountDetail.phoneNumber, [

          ]],
          roleId: [this.accountDetail.role.roleName, [
            Validators.required,
          ]],
          active: [this.accountDetail.role.accounts[0].active, [
            Validators.required,

          ]],
          description: [this.accountDetail.description, [

          ]]
        });

      },
      (error) => {
        console.log(error);
      },
    );
    this.disableAllField()
  }

}
