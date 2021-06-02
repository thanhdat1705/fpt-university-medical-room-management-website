import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() model: Account;

  url: any; //Angular 11, for stricter type
  msg = "";
  accountForm: FormGroup
  usernameMinLength = 3;
  passwordMinLength = 3;
  usernameMaxLength = 50;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z ]*';
  phoneNumberPattern = '[0-9]'
  matcher = new MyErrorStateMatcher();
  profile: any
  router: Router

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private summaryService: SummaryService) {
    this.profile = JSON.parse(activatedRoute.snapshot.params["profile"]);
  }

  

  ngOnInit(): void {
    // this.profile = this.profileComponent.profile;
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SWQiOiJiY2FjNzgwYy04YmY0LTQ4NjMtODRkYS00M2UwZWQzNWY0M2EiLCJEaXNwbGF5TmFtZSI6ImRvbyIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlIjoiMSIsIm5iZiI6MTYyMjQ4MjkzMCwiZXhwIjoxNjIzMDg3NzMwLCJpYXQiOjE2MjI0ODI5MzB9.jZYAzNobT_0weAusMndALNDA_CrnYX-BUYv2lgyYpxs");
    
    this.summaryService.setTokenHeaderFormData();

    this.url = this.profile.photoUrl;
    this.accountForm = this.formBuilder.group({

      avatarFile: [],

      email: [this.profile.email, [
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
        Validators.email,
      ]],

      displayName: [this.profile.displayName,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(this.pattern)
      ]
      ],
      phoneNumber: [this.profile.phoneNumber,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern(this.phoneNumberPattern)
      ],],
      description: [this.profile.description,

      ],
    });
  }

  get f() { return this.accountForm.controls; }

  updateAccount(data:  any) {
    const uploadData = new FormData();
    uploadData.append('email', this.accountForm.get('email').value);
    uploadData.append('avatarFile', this.accountForm.get('avatarFile').value);
    uploadData.append('phoneNumber', this.accountForm.get('phoneNumber').value);
    uploadData.append('displayName', this.accountForm.get('displayName').value);
    uploadData.append('description', this.accountForm.get('description').value);

    console.log("form: " + uploadData.get('avatarFile'));
    console.log(uploadData instanceof FormData);
    if (data.invalid) {
      return;
    }
    this.summaryService.updateProfile(uploadData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }
}
