import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SummaryService } from '../summary.service';
import { SearchMedicineUnitRequest } from '../../requests/medicine-unit/search-request';
import { StoreNewMedicineUnitRequest, UpdateMedicineUnitRequest } from '../../requests/medicine-unit/store-new-request';
import { StoreNewMedicineSubgroupRequest, UpdateMedicineSubgroupRequest } from '../../requests/medicine-subgroup/store-new-request';
import { StoreNewMedicineRequest } from '../../requests/medicine/store-new';
import { SearchMedicineSubgroupRequest } from '../../requests/medicine-subgroup/search-request';
import { SearchMedicineClassificationRequest } from '../../requests/medicine-classification/search-request';
import { SearchRequest } from '../../requests/search-request';
import { Router } from '@angular/router';
import { GeneralHelperService } from '../general-helper.service';
import { MedicineResponse } from '../../responses/medicine/medicine';
import { StoreNewMedicineClassificationRequest, UpdateMedicineClassificationRequest } from '../../requests/medicine-classification/store-new-request';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  isLoggedIn = false;
  // medicineDetail: MedicineResponse = null;

  constructor(private service: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService,) { }

  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Medicine -----------------------------------------*/
  // getMedicineDetail(): MedicineResponse {
  //   return this.medicineDetail;
  // }
  storeNewMedicine(request: StoreNewMedicineRequest) {
    return this.service.storeNewMedicine(request);
  }
  searchMedicine(request: SearchRequest) {
    return this.service.searchMedicine(request);
  }
  deleteMedicine(id: string) {
    return this.service.deleteMedicine(id);
  }
  getMedicineDetailsFromMedicineDetails(id: string) {
    return this.service.getMedicine(id);
  }
  getMedicine(id: string) {

    // this.service.getMedicine(id).subscribe(
    //   (response) => {
    //     this.medicineDetail = response.data;
    //     console.log(this.medicineDetail);
    //     this.router.navigate(['medicine-management/medicine-list/details-medicine'], {
    //       queryParams: { id: id }
    //     });
    //   },
    //   (error) => {
    //     this.router.navigate(['medicine-management/medicine-list']);
    //     console.log('get detail error');
    //     this.generalService.createErrorNotification(error);
    //   }
    // )

    return this.service.getMedicine(id);
  }
  updateMedicine(request: StoreNewMedicineRequest, id: string) {
    return this.service.updateMedicine(request, id);
  }
  /*------------------------------------------------------------------------------------------*/
  /*--------------------------------------- Unit ---------------------------------------------*/
  searchMedicineUnit(searchRequest: SearchRequest) {
    return this.service.searchMedicineUnit(searchRequest);
  }
  storeNewMedicineUnit(storeRequest: StoreNewMedicineUnitRequest) {
    return this.service.storeNewMedicineUnit(storeRequest);
  }
  getAllMedicineUnit() {
    return this.service.getAllMedicineUnit();
  }
  updateMedicineUnit(id: string, data: UpdateMedicineUnitRequest) {
    return this.service.updateMedicineUnit(id, data);
  }
  deleteMedicineUnit(id: string) {
    return this.service.deleteMedicineUnit(id);
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
  searchMedicineSubgroup(searchRequest: SearchRequest) {
    return this.service.searchMedicineSubgroup(searchRequest);
  }
  updateMedicineSubgroup(id: string, data: UpdateMedicineSubgroupRequest) {
    return this.service.updateMedicineSubgroup(id, data);
  }
  deleteMedicineSubgroup(id: string) {
    return this.service.deleteMedicineSubgroup(id);
  }

  /*------------------------------------------------------------------------------------------*/
  /*-------------------------------------- Classification ------------------------------------*/
  getAllMedicineClassification() {
    return this.service.getAllMedicineClassification();
  }
  searchClass(searchRequest: SearchRequest) {
    return this.service.searchClassification(searchRequest);
  }
  storeNewMedicineClassification(storeRequest: StoreNewMedicineClassificationRequest) {
    return this.service.storeNewMedicineClassification(storeRequest);
  }
  updateMedicineClassification(id: string, data: UpdateMedicineClassificationRequest) {
    return this.service.updateMedicineClassification(id, data);
  }
  deleteMedicineClassification(id: string) {
    return this.service.deleteMedicineClassification(id);
  }
  
  /*------------------------------------------------------------------------------------------*/
}
