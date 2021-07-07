import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { AccountDetailResponse } from 'src/app/shared/responses/account-details-response';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { HeaderComponent } from 'src/app/shared/template/header/header.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('header', { static: false }) header: HeaderComponent;
  imageUrl: any;
  editProfileForm: FormGroup;
  matcher = new MyErrorStateMatcher;
  usernameMinLength = 3;
  passwordMinLength = 3;
  usernameMaxLength = 50;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z ]*';
  phoneNumberPattern = '[0-9]*'
  profile: Account;
  file: File;
  fileName: string;
  url: any;
  reader = new FileReader();
  isEditing = false;

  get f() { return this.editProfileForm.controls; }


  constructor(
    private formBuilder: FormBuilder,
    private summaryService: SummaryService,
    private generalService: GeneralHelperService,
    private headerService: HeaderService,
    private router: Router
  ) {
    // this.profile = JSON.parse(activatedRoute.snapshot.params["profile"]);
  }

  async ngOnInit(): Promise<void> {
    this.editProfileForm = this.formBuilder.group({
      email: [
       '',
        [Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
        Validators.email,
        ]
      ],
      displayName: [
        '',
        [Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
          // Validators.pattern(this.pattern)
        ]
      ], internalCode: [
        '',
        [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          // Validators.pattern(this.pattern)
        ]
      ], phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          Validators.pattern(this.phoneNumberPattern),
          // Validators.pattern(this.pattern)
        ]
      ], description: ['',
      ],
    });
    this.getProfile();
  }

  disableUpdate() {
    this.isEditing = false;
    this.editProfileForm.controls['internalCode'].disable();
    this.editProfileForm.controls['displayName'].disable();
    this.editProfileForm.controls['email'].disable();
    this.editProfileForm.controls['phoneNumber'].disable();
    this.editProfileForm.controls['description'].disable();
  }

  enableUpdate() {
    this.isEditing = true;
    this.editProfileForm.controls['internalCode'].enable();
    this.editProfileForm.controls['displayName'].enable();
    this.editProfileForm.controls['email'].enable();
    this.editProfileForm.controls['phoneNumber'].enable();
    this.editProfileForm.controls['description'].enable();
  }

  updateAccount() {
    if (this.editProfileForm.invalid) {
      console.log("invalid");
      return;
    }
    this.generalService.openWaitingPopupNz();

    const uploadData = new FormData();
    uploadData.append('email', this.editProfileForm.get('email').value);
    uploadData.append('avatarFile', this.file);
    uploadData.append('phoneNumber', this.editProfileForm.get('phoneNumber').value);
    uploadData.append('displayName', this.editProfileForm.get('displayName').value);
    uploadData.append('description', this.editProfileForm.get('description').value);

    console.log("name: " + uploadData.get('displayName'));
    console.log("phoneNumber: " + uploadData.get('phoneNumber'));
    console.log("avatarFile: " + uploadData.get('avatarFile'));
    console.log("email: " + uploadData.get('email'));

    console.log(uploadData instanceof FormData);

    this.summaryService.updateProfile(uploadData).subscribe(
      (response) => {
        console.log(response);
        console.log('response avatar: ' + response.data.photoUrl);
        this.headerService.setAvatar(response.data.photoUrl);
        this.headerService.setName(response.data.displayName);
        localStorage.setItem('photoUrl', response.data.photoUrl);
        localStorage.setItem('displayName', response.data.displayName);
        this.generalService.closeWaitingPopupNz();
        this.generalService.messageNz('success', `Thông tin đã được cập nhật`);
        this.router.navigate(['/account/profile']);
      },
      (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/account/profile']);
  }

  getProfile() {
    this.summaryService.getProfile().subscribe(
      (response) => {
        this.profile = response.data;
        console.log(this.profile);
        this.editProfileForm.setValue({
          internalCode: this.profile.internalCode,
          displayName: this.profile.displayName,
          email: this.profile.email,
          phoneNumber: this.profile.phoneNumber,
          description: this.profile.description
        });
        this.url = this.profile.photoUrl;
      },
      (error) => {
        console.log(error);
      }
    );
    this.disableUpdate();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log('Got file' + this.file);
    if (this.file) {
      this.reader.readAsDataURL(this.file);
      this.reader.onload = (_event) => {
        this.url = this.reader.result;
      }
      this.fileName = this.file.name;
    }
  }
}
