import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SummaryService } from '../summary.service';
import { SearchMedicineUnitRequest } from '../../requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest } from '../../requests/medicine-unit/store-new-request';
import { StoreNewMedicineSubgroupRequest } from '../../requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineRequest } from '../../requests/medicine/store-new';
import { SearchMedicineRequest } from '../../requests/medicine/search';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  isLoggedIn = false;
  constructor(private service: SummaryService,) { }


  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Medicine -----------------------------------------*/
  storeNewMedicine(request: StoreNewMedicineRequest) {
    return this.service.storeNewMedicine(request);
  }
  searchMedicine(request: SearchMedicineRequest) {
    return this.service.searchMedicine(request);
  }
  deleteMedicine(id: string) {
    return this.service.deleteMedicine(id);
  }
  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Unit ---------------------------------------------*/
  searchMedicineUnit(searchRequest: SearchMedicineUnitRequest) {
    return this.service.searchMedicineUnit(searchRequest);
  }
  storeNewMedicineUnit(storeRequest: StoreNewMedicineUnitRequest) {
    return this.service.storeNewMedicineUnit(storeRequest);
  }
  getAllMedicineUnit() {
    return this.service.getAllMedicineUnit();
  }
  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Subgroup -----------------------------------------*/
  storeNewMedicineSubgroup(storeRequest: StoreNewMedicineSubgroupRequest) {
    return this.service.storeNewMedicineSubgroup(storeRequest);
  }

  getAllMedicineSubgroup() {
    return this.service.getAllMedicineSubgroup();
  }
  /*------------------------------------------------------------------------------------------*/
  /*-------------------------------------- Classification ------------------------------------*/
  getAllMedicineClassification() {
    return this.service.getAllMedicineClassification();
  }
  /*------------------------------------------------------------------------------------------*/
}
