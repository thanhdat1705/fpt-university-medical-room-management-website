import { Injectable } from '@angular/core';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class RequestBuyMedicineService {

  constructor(private service: SummaryService) { }


  addRequestBuyMedicine(data: any) {
    return this.service.addRquestBuyMedicine(data);
  }
}
