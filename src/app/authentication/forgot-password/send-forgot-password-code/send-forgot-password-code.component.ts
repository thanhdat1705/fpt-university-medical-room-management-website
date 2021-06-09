import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SummaryService } from 'src/app/shared/services/summary.service';

@Component({
  selector: 'app-send-forgot-password-code',
  templateUrl: './send-forgot-password-code.component.html',
  styleUrls: ['./send-forgot-password-code.component.scss']
})
export class SendForgotPasswordCodeComponent implements OnInit {

  forgotPasswordCodeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private sumaryService: SummaryService,
    private router: Router,
    ) { 

  }

  ngOnInit(): void {
    this.forgotPasswordCodeForm = this.formBuilder.group({
      verifyCode: [''],
    });
  }
  sendingCodeForgotPassword(data: any){
    this.sumaryService.verifyingCodeForgotPassword(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/authentication/forgot-password/change-forgot-password']);
      }, (error) => {
        console.log(error);
      }, 
    )
  }
}
