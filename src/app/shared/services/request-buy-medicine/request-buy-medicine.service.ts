import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class RequestBuyMedicineService {

  constructor(
    private service: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService,
  ) { }


  addRequestBuyMedicine(data: any) {
    return this.service.addRquestBuyMedicine(data);
  }

  updateRequestBuyMedicine(data: any, id: string, selectFields: string) {
    return this.service.updateRequestBuyMedicine(data, id, selectFields);
  }

  getDetailBuyMedicine(id: string, selectFields: string) {
    return this.service.getDetailBuyMedicine(id, selectFields)
  }

  getDetailBuyMedicineToDetailScreen(id: string, selectFields: string) {
    this.service.getDetailBuyMedicine(id, selectFields).subscribe(
      (response) => {
        this.router.navigate(['request-buy-medicine/buy-medicine-list/detail-request', id], {
          fragment: response.data
        });
      },
      (error) => {
        this.router.navigate(['request-buy-medicine/buy-medicine-list']);
        console.log('get detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  getDetailBuyMedicineToUpdateScreen(id: string, selectFields: string) {
    this.service.getDetailBuyMedicine(id, selectFields).subscribe(
      (response) => {
        this.router.navigate(['request-buy-medicine/buy-medicine-list/update-request', id]);
      },
      (error) => {
        this.router.navigate(['request-buy-medicine/buy-medicine-list']);
        console.log('get detail error');
        this.generalService.createErrorNotification(error);
      }
    )
  }

  searchRequestBuyMedicine(data: any) {
    return this.service.searchRequestBuyMedicine(data);
  }

  // RequestBuyMedicineDetail

  searchRequestBuyMedicineDetail(data: any) {
    return this.service.searchRequestBuyMedicineDetail(data);
  }
}
