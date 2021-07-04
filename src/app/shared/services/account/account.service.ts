import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
param="";
  constructor(
    private summaryService : SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }

  getAccountDetails(id: string) {
    this.summaryService.getAccountDetail(id, this.param).subscribe(
      (response) => {
        this.router.navigate(['/account/account-detail', id], {
          fragment: response.data
          
        });
        console.log(response.data);

      },
      (error) => {
        this.router.navigate(['/account/account-list']);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    )
  }
}
