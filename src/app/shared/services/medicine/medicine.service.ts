import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SummaryService } from '../summary.service';
import { SearchMedicineUnitRequest } from '../../requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest } from '../../requests/medicine-unit/store-new-request';
import { StoreNewMedicineSubgroupRequest } from '../../requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineRequest } from '../../requests/medicine/store-new';
import { SearchMedicineRequest } from '../../requests/medicine/search';
import { SearchMedicineSubgroupRequest } from '../../requests/medicine-subgroup/search-request';
import { SearchMedicineClassificationRequest } from '../../requests/medicine-classification/search-request';

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
  getMedicine(id: string) {
    return this.service.getMedicine(id);
  }
  updateMedicine(request: StoreNewMedicineRequest, id: string) {
    return this.service.updateMedicine(request, id);
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
  // deleteMedicineUnit() {
  //   return this.service.deleteMedicineUnit();
  // }
  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Subgroup -----------------------------------------*/
  storeNewMedicineSubgroup(storeRequest: StoreNewMedicineSubgroupRequest) {
    return this.service.storeNewMedicineSubgroup(storeRequest);
  }

  getAllMedicineSubgroup() {
    return this.service.getAllMedicineSubgroup();
  }
  searchMedicineSubgroup(searchRequest: SearchMedicineSubgroupRequest) {
    return this.service.searchMedicineSubgroup(searchRequest);
  }
  /*------------------------------------------------------------------------------------------*/
  /*-------------------------------------- Classification ------------------------------------*/
  getAllMedicineClassification() {
    return this.service.getAllMedicineClassification();
  }
  searchClass(searchRequest: SearchMedicineClassificationRequest) {
    return this.service.searchClassification(searchRequest);
  }
  /*------------------------------------------------------------------------------------------*/
}
