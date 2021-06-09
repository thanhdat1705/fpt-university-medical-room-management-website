import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { ForgotPasswordCodeResponse } from 'src/app/shared/responses/forgot-password-code';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {
    
  }



}
