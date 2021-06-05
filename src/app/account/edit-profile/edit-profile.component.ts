import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { HeaderComponent } from 'src/app/shared/template/header/header.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild(HeaderComponent)
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
  router: Router;
  file: File;
  fileName: string;
  get f() { return this.editProfileForm.controls; }


  constructor(private formBuilder: FormBuilder, private summaryService: SummaryService, private generalService: GeneralHelperService) {
    // this.profile = JSON.parse(activatedRoute.snapshot.params["profile"]);
  }

  headerComponent: HeaderComponent;

  async ngOnInit(): Promise<void> {
    this.getProfile();
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
        console.log(response.data.photoUrl);

        localStorage.setItem('avatar', response.data.photoUrl);

        this.generalService.closeWaitingPopupNz();

        this.router.navigate(['/account/profile']);
      },
      (error) => {
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    );

  }

  async getProfile() {
    this.summaryService.getProfile().subscribe(
      (response) => {
        this.profile = response.data;
        //   data.displayName = response.data.displayName;
        //   data.description = response.data.description;
        //   data.phoneNumber = response.data.phoneNumber;
        //   data.photoUrl = response.data.photoUrl;

        //  console.log('response name: ' + response.data.displayName) ;
        //   console.log("data" + this.profile);
        console.log(this.profile.email);
        this.imageUrl = this.profile.photoUrl;
        this.editProfileForm = this.formBuilder.group({
          email: [this.profile.email,
          [Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
          Validators.email,]
          ],
          displayName: [this.profile.displayName,
          [Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength),
            // Validators.pattern(this.pattern)
          ]
          ], phoneNumber: [this.profile.phoneNumber,
          [
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(this.passwordMaxLength),
            // Validators.pattern(this.pattern)
          ]
          ], description: [this.profile.description,
          ],
          avatarFile: [],
        });

      },
      (error) => {
        console.log(error);
      }
    );
  }


  // selectFile(event: any) { //Angular 11, for stricter type
  //   if (!event.target.files[0] || event.target.files[0].length == 0) {
  //     this.msg = 'You must select an image';
  //     return;
  //   }

  //   var mimeType = event.target.files[0].type;

  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = "Only images are supported";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);

  //   reader.onload = (_event) => {
  //     this.msg = "";
  //     this.url = reader.result;
  //   }
  // }

  onFileSelected(event) {

    this.file = event.target.files[0];
    console.log('Got file' + this.file);

    if (this.file) {

      this.fileName = this.file.name;
    }
  }
}
