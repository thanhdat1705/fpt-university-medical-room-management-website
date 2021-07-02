import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GeneralHelperService } from '../general-helper.service';
import { SummaryService } from '../summary.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineEliminationService {
  param = 'quantity, medicine.name, createDate, updateDate, reason, medicineInInventoryDetail.importMedicine, medicineInInventoryDetail, medicine.medicineSubGroup, medicine.medicineClassification, medicine.medicineUnit';

  id: any;
  unitName: any;
  batch: any;
  quantity: number;
  eliminateMedicineComponentSource = new Subject<boolean>();
  eliminateMedicineComponent = this.eliminateMedicineComponentSource.asObservable();
  name: any;

  constructor(private summaryService: SummaryService,
    private router: Router,
    private generalService: GeneralHelperService) { }

  deleteEliminatedMedicine(id: any) {
    this.summaryService.deleteEliminatedMedicineDetails(id).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  reloadMedicineTableAfterEliminate() {
    this.eliminateMedicineComponentSource.next(null);

  }

  setMedicineInInventoryDetailsId(id: any) {
    this.id = id;
  }
  getMedicineInInventoryDetailsId() {
    return this.id;
  }
  setMedicineUnit(unitName: any) {
    this.unitName = unitName;
  }
  getMedicineUnit() {
    return this.unitName;
  }
  setMedicineBatch(batch: any) {
    this.batch = batch;
  }
  getMedicineBatch() {
    return this.batch;
  }
  setMedicineQuantity(quantity: any) {
    this.quantity = quantity;
  }
  getMedicineQuantity() {
    return this.quantity;
  }
  setMedicineName(name: any) {
    this.name = name;
  }
  getMedicineName(){
    return this.name;
  }

  getEliminatedMedicineDetails(id: any) {
    this.summaryService.getEliminatedMedicineDetails(id, this.param).subscribe(
      (response) => {
        this.router.navigate(['/batch-medicine-management/eliminated-medicine-details', id], {
          fragment: response.data
        });
        console.log(response.data);
      },
      (error) => {
        this.router.navigate(['/batch-medicine-management/eliminated-medicines-list']);
        console.log(error);
        this.generalService.createErrorNotification(error);
      }
    )
  }

}
