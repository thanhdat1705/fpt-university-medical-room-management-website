import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SummaryService } from '../summary.service';
import { SearchMedicineUnitRequest } from '../../requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest } from '../../requests/medicine-unit/store-new-request';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  isLoggedIn = false;
  constructor(private service: SummaryService,) {}
  

  searchMedicineUnit(searchRequest: SearchMedicineUnitRequest) {
    return this.service.searchMedicineUnit(searchRequest);
  }

  storeNewMedicineUnit(storeRequest: StoreNewMedicineUnitRequest) {
    return this.service.storeNewMedicineUnit(storeRequest);
  }

  getAllMedicineUnit() {
    return this.service.getAllMedicineUnit();
  }

  getAllMedicineSubgroup() {
    return this.service.getAllMedicineSubgroup();
  }
}
