import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WaitingComponent } from 'src/app/shared/components/waiting/waiting.component';
import { GeneralHelperService } from 'src/app/shared/services/general-helper.service';
import { AuthService } from './../../shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });

    
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      // this.loginForm.controls[i].markAsDirty();
      // this.loginForm.controls[i].updateValueAndValidity();
    }
  }

}
