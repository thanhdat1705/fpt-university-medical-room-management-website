import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private summaryService : SummaryService,
    private router: Router,
    private generalService: GeneralHelperService
  ) { }

  getMedicineDetails(id: string) {
    this.summaryService.getAccountDetail(id).subscribe(
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
