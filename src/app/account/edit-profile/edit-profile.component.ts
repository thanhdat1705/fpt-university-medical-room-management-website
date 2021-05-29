import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/my-error-state-matcher';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() model: Account;
  
  url: any; //Angular 11, for stricter type
  msg = "";
  accountForm : FormGroup
  usernameMinLength = 3;
  passwordMinLength = 3;
  usernameMaxLength = 50;
  passwordMaxLength = 50;
  pattern = '[a-zA-Z0-9]*';
  matcher = new MyErrorStateMatcher();
  profile : any
  router : Router

  constructor(private formBuilder : FormBuilder, private activatedRoute: ActivatedRoute) { 
    this.profile = JSON.parse(activatedRoute.snapshot.params["profile"]);
  }

  ngOnInit(): void {
    // this.profile = this.profileComponent.profile;
    this.url = this.profile.photoUrl;
    this.accountForm = this.formBuilder.group({
      email: [this.profile.email, [
        Validators.required,
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
      phone: [this.profile.phoneNumber,
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
        Validators.pattern(this.pattern)
      ],],
      description:[this.profile.description,

      ],
    });
  }

  get f() { return this.accountForm.controls; }

  updateAccount(account:any){

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
